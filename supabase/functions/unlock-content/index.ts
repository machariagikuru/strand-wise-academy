
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { contentId, contentType, method, paymentData } = await req.json();

    // Get content details
    const table = contentType === 'note' ? 'notes' : 'quizzes';
    const { data: content, error: contentError } = await supabaseClient
      .from(table)
      .select('is_premium, price, points_required, shares_required, author_id')
      .eq('id', contentId)
      .single();

    if (contentError) throw contentError;

    if (!content.is_premium) {
      // Content is free, just create unlock record
      const { error } = await supabaseClient
        .from('content_unlocks')
        .insert({
          user_id: user.id,
          [`${contentType}_id`]: contentId,
          unlock_method: 'free'
        });

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Handle different unlock methods
    switch (method) {
      case 'points':
        // Check if user has enough points
        const { data: profile } = await supabaseClient
          .from('user_profiles')
          .select('strand_points')
          .eq('id', user.id)
          .single();

        if (profile.strand_points < content.points_required) {
          throw new Error('Insufficient points');
        }

        // Spend points and create unlock
        const success = await supabaseClient.rpc('spend_points', {
          p_user_id: user.id,
          p_points: content.points_required,
          p_reason: `Unlocked ${contentType}: ${contentId}`,
          p_reference_id: contentId
        });

        if (!success.data) throw new Error('Failed to spend points');

        await supabaseClient.from('content_unlocks').insert({
          user_id: user.id,
          [`${contentType}_id`]: contentId,
          unlock_method: 'points',
          points_spent: content.points_required
        });

        // Award points to content author
        await supabaseClient.rpc('award_points', {
          p_user_id: content.author_id,
          p_points: Math.floor(content.points_required * 0.7), // 70% to author
          p_reason: `Content unlocked by user: ${contentType}`,
          p_reference_id: contentId
        });

        break;

      case 'share':
        // Create unlock record with share tracking
        await supabaseClient.from('content_unlocks').insert({
          user_id: user.id,
          [`${contentType}_id`]: contentId,
          unlock_method: 'share',
          shares_count: content.shares_required
        });

        // Update content share count
        await supabaseClient
          .from(table)
          .update({ shares: supabaseClient.raw('shares + 1') })
          .eq('id', contentId);

        break;

      case 'payment':
        // Handle M-Pesa or other payment methods
        // This would integrate with payment providers
        const { data: payment, error: paymentError } = await supabaseClient
          .from('payments')
          .insert({
            user_id: user.id,
            amount: content.price,
            currency: 'KES',
            payment_method: paymentData.method,
            phone_number: paymentData.phone,
            purpose: 'content_unlock',
            reference_id: contentId,
            status: 'pending'
          })
          .select()
          .single();

        if (paymentError) throw paymentError;

        // In production, this would trigger M-Pesa STK push
        // For now, we'll simulate successful payment
        await supabaseClient
          .from('payments')
          .update({ status: 'completed' })
          .eq('id', payment.id);

        await supabaseClient.from('content_unlocks').insert({
          user_id: user.id,
          [`${contentType}_id`]: contentId,
          unlock_method: 'payment',
          amount_paid: content.price
        });

        // Add earnings to author
        await supabaseClient
          .from('user_profiles')
          .update({
            earnings: supabaseClient.raw(`earnings + ${content.price * 0.8}`) // 80% to author
          })
          .eq('id', content.author_id);

        break;

      default:
        throw new Error('Invalid unlock method');
    }

    // Update user progress
    await supabaseClient.rpc('update_user_progress', {
      p_user_id: user.id,
      p_sub_strand_id: content.sub_strand_id,
      p_type: contentType
    });

    // Check for new badges
    await supabaseClient.rpc('check_and_award_badges', {
      p_user_id: user.id
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400
    });
  }
});
