
import { supabase } from '@/hooks/useAuth';
import { Subject, Strand, SubStrand, Note, Quiz, QuizAttempt, User } from '@/types';

export class ApiService {
  // Subjects
  static async getSubjects(): Promise<Subject[]> {
    const { data, error } = await supabase
      .from('subjects')
      .select(`
        *,
        strands (
          *,
          sub_strands (
            *,
            notes (count),
            quizzes (count)
          )
        )
      `)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  static async getSubject(slug: string): Promise<Subject | null> {
    const { data, error } = await supabase
      .from('subjects')
      .select(`
        *,
        strands (
          *,
          sub_strands (
            *,
            notes (count),
            quizzes (count)
          )
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }

  // Notes
  static async getNotes(subStrandId?: string, limit?: number): Promise<Note[]> {
    let query = supabase
      .from('notes')
      .select(`
        *,
        user_profiles!author_id (name),
        sub_strands (name, strands (name, subjects (name)))
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (subStrandId) {
      query = query.eq('sub_strand_id', subStrandId);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getNote(id: string): Promise<Note | null> {
    const { data, error } = await supabase
      .from('notes')
      .select(`
        *,
        user_profiles!author_id (name),
        sub_strands (name, strands (name, subjects (name))),
        discussions (
          *,
          user_profiles (name)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    // Check if user has unlocked this note
    if (data?.is_premium) {
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        const { data: unlock } = await supabase
          .from('content_unlocks')
          .select('id')
          .eq('user_id', user.data.user.id)
          .eq('note_id', id)
          .single();

        data.isUnlocked = !!unlock;
      } else {
        data.isUnlocked = false;
      }
    } else {
      data.isUnlocked = true;
    }

    return data;
  }

  static async unlockNote(noteId: string, method: 'payment' | 'points' | 'share', data?: any): Promise<boolean> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('content_unlocks')
      .insert({
        user_id: user.data.user.id,
        note_id: noteId,
        unlock_method: method,
        ...data
      });

    if (error) throw error;

    // Update progress and check badges
    await this.updateProgress(noteId, 'note');
    return true;
  }

  // Quizzes
  static async getQuizzes(subStrandId?: string, limit?: number): Promise<Quiz[]> {
    let query = supabase
      .from('quizzes')
      .select(`
        *,
        user_profiles!author_id (name),
        sub_strands (name, strands (name, subjects (name))),
        quiz_questions (count)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (subStrandId) {
      query = query.eq('sub_strand_id', subStrandId);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getQuiz(id: string): Promise<Quiz | null> {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        user_profiles!author_id (name),
        sub_strands (name, strands (name, subjects (name))),
        quiz_questions (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async submitQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completedAt'>): Promise<QuizAttempt> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        ...attempt,
        user_id: user.data.user.id,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Award points for completion
    if (attempt.passed) {
      const points = Math.max(10, Math.floor(attempt.score / attempt.totalQuestions * 20));
      await this.awardPoints(points, `Quiz completed: ${attempt.score}/${attempt.totalQuestions}`);
    }

    // Update progress and check badges
    await this.updateProgress(attempt.quizId, 'quiz');
    return data;
  }

  // User Progress
  static async getUserProgress(userId?: string): Promise<any[]> {
    const user = userId ? { id: userId } : (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        subjects (name, icon, color),
        strands (name),
        sub_strands (name)
      `)
      .eq('user_id', user.id)
      .order('last_activity', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Points and Badges
  static async awardPoints(points: number, reason: string, referenceId?: string): Promise<void> {
    const { error } = await supabase.rpc('award_points', {
      p_user_id: (await supabase.auth.getUser()).data.user?.id,
      p_points: points,
      p_reason: reason,
      p_reference_id: referenceId
    });

    if (error) throw error;

    // Check for new badges
    await this.checkBadges();
  }

  static async spendPoints(points: number, reason: string, referenceId?: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('spend_points', {
      p_user_id: (await supabase.auth.getUser()).data.user?.id,
      p_points: points,
      p_reason: reason,
      p_reference_id: referenceId
    });

    if (error) throw error;
    return data;
  }

  static async checkBadges(): Promise<void> {
    const { error } = await supabase.rpc('check_and_award_badges', {
      p_user_id: (await supabase.auth.getUser()).data.user?.id
    });

    if (error) throw error;
  }

  // Discussions
  static async addComment(noteId: string, content: string, parentId?: string): Promise<any> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('discussions')
      .insert({
        note_id: noteId,
        user_id: user.data.user.id,
        parent_id: parentId,
        content
      })
      .select(`
        *,
        user_profiles (name)
      `)
      .single();

    if (error) throw error;

    // Award points for engagement
    await this.awardPoints(5, 'Comment posted', noteId);
    return data;
  }

  // Admin functions
  static async getUsers(role?: string): Promise<User[]> {
    let query = supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (role) {
      query = query.eq('role', role);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async updateUserRole(userId: string, role: string): Promise<void> {
    const { error } = await supabase
      .from('user_profiles')
      .update({ role })
      .eq('id', userId);

    if (error) throw error;
  }

  static async getAnalytics(): Promise<any> {
    const [users, notes, quizzes, payments] = await Promise.all([
      supabase.from('user_profiles').select('role', { count: 'exact' }),
      supabase.from('notes').select('status', { count: 'exact' }),
      supabase.from('quiz_attempts').select('passed', { count: 'exact' }),
      supabase.from('payments').select('status, amount', { count: 'exact' })
    ]);

    return {
      users: users.count || 0,
      notes: notes.count || 0,
      quizzes: quizzes.count || 0,
      revenue: payments.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
    };
  }

  // Private helper methods
  private static async updateProgress(contentId: string, type: 'note' | 'quiz'): Promise<void> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    // Get sub-strand ID from content
    const table = type === 'note' ? 'notes' : 'quizzes';
    const { data } = await supabase
      .from(table)
      .select('sub_strand_id')
      .eq('id', contentId)
      .single();

    if (data?.sub_strand_id) {
      await supabase.rpc('update_user_progress', {
        p_user_id: user.data.user.id,
        p_sub_strand_id: data.sub_strand_id,
        p_type: type
      });
    }
  }
}
