
-- Insert default subjects
INSERT INTO public.subjects (id, name, description, icon, color, slug) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'English', 'Master the English language through grammar, literature, and writing', 'book-open', '#3B82F6', 'english'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Mathematics', 'Explore numbers, equations, and mathematical concepts', 'calculator', '#10B981', 'mathematics'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Science', 'Discover the wonders of physics, chemistry, and biology', 'microscope', '#8B5CF6', 'science'),
  ('550e8400-e29b-41d4-a716-446655440004', 'History', 'Journey through time and learn about past civilizations', 'clock', '#F59E0B', 'history'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Geography', 'Explore the world, maps, and geographical phenomena', 'map', '#EF4444', 'geography');

-- Insert strands for English
INSERT INTO public.strands (id, name, description, subject_id, slug, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440011', 'Grammar', 'Essential grammar rules and structures', '550e8400-e29b-41d4-a716-446655440001', 'grammar', 1),
  ('550e8400-e29b-41d4-a716-446655440012', 'Literature', 'Poetry, novels, and literary analysis', '550e8400-e29b-41d4-a716-446655440001', 'literature', 2),
  ('550e8400-e29b-41d4-a716-446655440013', 'Writing', 'Essay writing, creative writing, and composition', '550e8400-e29b-41d4-a716-446655440001', 'writing', 3),
  ('550e8400-e29b-41d4-a716-446655440014', 'Reading Comprehension', 'Understanding and analyzing texts', '550e8400-e29b-41d4-a716-446655440001', 'reading-comprehension', 4);

-- Insert sub-strands for Grammar
INSERT INTO public.sub_strands (id, name, description, strand_id, slug, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440021', 'Noun Usage', 'Types of nouns and their proper usage', '550e8400-e29b-41d4-a716-446655440011', 'noun-usage', 1),
  ('550e8400-e29b-41d4-a716-446655440022', 'Verb Tenses', 'Past, present, and future tense structures', '550e8400-e29b-41d4-a716-446655440011', 'verb-tenses', 2),
  ('550e8400-e29b-41d4-a716-446655440023', 'Sentence Structure', 'Building complex and compound sentences', '550e8400-e29b-41d4-a716-446655440011', 'sentence-structure', 3),
  ('550e8400-e29b-41d4-a716-446655440024', 'Punctuation', 'Correct use of commas, periods, and other marks', '550e8400-e29b-41d4-a716-446655440011', 'punctuation', 4);

-- Insert sub-strands for Literature
INSERT INTO public.sub_strands (id, name, description, strand_id, slug, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440025', 'Poetry Analysis', 'Understanding poetic devices and themes', '550e8400-e29b-41d4-a716-446655440012', 'poetry-analysis', 1),
  ('550e8400-e29b-41d4-a716-446655440026', 'Character Development', 'Analyzing characters in literature', '550e8400-e29b-41d4-a716-446655440012', 'character-development', 2),
  ('550e8400-e29b-41d4-a716-446655440027', 'Theme Identification', 'Finding and analyzing themes in texts', '550e8400-e29b-41d4-a716-446655440012', 'theme-identification', 3);

-- Insert default badges
INSERT INTO public.badges (id, name, description, icon, color, requirement_type, requirement_value, points_reward) VALUES
  ('550e8400-e29b-41d4-a716-446655440041', 'Grammar Master', 'Complete 10 grammar quizzes with 80% or higher', 'award', '#F59E0B', 'grammar_quizzes', 10, 100),
  ('550e8400-e29b-41d4-a716-446655440042', 'Quiz Champion', 'Complete 25 quizzes across all subjects', 'trophy', '#10B981', 'quiz_count', 25, 200),
  ('550e8400-e29b-41d4-a716-446655440043', 'Knowledge Seeker', 'Read 50 notes across all subjects', 'book', '#3B82F6', 'notes_read', 50, 150),
  ('550e8400-e29b-41d4-a716-446655440044', 'Point Collector', 'Accumulate 1000 StrandPoints', 'star', '#8B5CF6', 'points_total', 1000, 250),
  ('550e8400-e29b-41d4-a716-446655440045', 'Discussion Leader', 'Make 20 helpful comments on notes', 'message-circle', '#EF4444', 'comments_count', 20, 100);

-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- This will be called after user registration via trigger
  NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'learner')
  );
  
  -- Give new users starting points
  INSERT INTO public.point_transactions (user_id, points, transaction_type, reason)
  VALUES (NEW.id, 100, 'earned', 'Welcome bonus - new user registration');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update user progress
CREATE OR REPLACE FUNCTION update_user_progress(
  p_user_id UUID,
  p_sub_strand_id UUID,
  p_type TEXT -- 'note' or 'quiz'
)
RETURNS void AS $$
DECLARE
  v_strand_id UUID;
  v_subject_id UUID;
  v_total_notes INTEGER;
  v_total_quizzes INTEGER;
  v_completed_notes INTEGER;
  v_completed_quizzes INTEGER;
  v_progress DECIMAL(5,2);
BEGIN
  -- Get strand and subject IDs
  SELECT strand_id INTO v_strand_id
  FROM public.sub_strands
  WHERE id = p_sub_strand_id;
  
  SELECT subject_id INTO v_subject_id
  FROM public.strands
  WHERE id = v_strand_id;
  
  -- Count total content in this sub-strand
  SELECT COUNT(*) INTO v_total_notes
  FROM public.notes
  WHERE sub_strand_id = p_sub_strand_id AND status = 'published';
  
  SELECT COUNT(*) INTO v_total_quizzes
  FROM public.quizzes
  WHERE sub_strand_id = p_sub_strand_id AND status = 'published';
  
  -- Count completed content
  SELECT COUNT(DISTINCT note_id) INTO v_completed_notes
  FROM public.content_unlocks
  WHERE user_id = p_user_id AND note_id IN (
    SELECT id FROM public.notes WHERE sub_strand_id = p_sub_strand_id
  );
  
  SELECT COUNT(DISTINCT quiz_id) INTO v_completed_quizzes
  FROM public.quiz_attempts
  WHERE user_id = p_user_id AND quiz_id IN (
    SELECT id FROM public.quizzes WHERE sub_strand_id = p_sub_strand_id
  ) AND passed = true;
  
  -- Calculate progress percentage
  IF (v_total_notes + v_total_quizzes) > 0 THEN
    v_progress := ((v_completed_notes + v_completed_quizzes)::DECIMAL / (v_total_notes + v_total_quizzes)) * 100;
  ELSE
    v_progress := 0;
  END IF;
  
  -- Upsert progress record
  INSERT INTO public.user_progress (
    user_id, subject_id, strand_id, sub_strand_id,
    notes_completed, quizzes_completed,
    total_notes, total_quizzes,
    progress_percentage, last_activity
  )
  VALUES (
    p_user_id, v_subject_id, v_strand_id, p_sub_strand_id,
    v_completed_notes, v_completed_quizzes,
    v_total_notes, v_total_quizzes,
    v_progress, NOW()
  )
  ON CONFLICT (user_id, sub_strand_id)
  DO UPDATE SET
    notes_completed = v_completed_notes,
    quizzes_completed = v_completed_quizzes,
    total_notes = v_total_notes,
    total_quizzes = v_total_quizzes,
    progress_percentage = v_progress,
    last_activity = NOW(),
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to award points
CREATE OR REPLACE FUNCTION award_points(
  p_user_id UUID,
  p_points INTEGER,
  p_reason TEXT,
  p_reference_id UUID DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  -- Insert transaction record
  INSERT INTO public.point_transactions (user_id, points, transaction_type, reason, reference_id)
  VALUES (p_user_id, p_points, 'earned', p_reason, p_reference_id);
  
  -- Update user's point balance
  UPDATE public.user_profiles
  SET strand_points = strand_points + p_points,
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to spend points
CREATE OR REPLACE FUNCTION spend_points(
  p_user_id UUID,
  p_points INTEGER,
  p_reason TEXT,
  p_reference_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_points INTEGER;
BEGIN
  -- Check current balance
  SELECT strand_points INTO v_current_points
  FROM public.user_profiles
  WHERE id = p_user_id;
  
  IF v_current_points < p_points THEN
    RETURN FALSE; -- Insufficient points
  END IF;
  
  -- Deduct points
  INSERT INTO public.point_transactions (user_id, points, transaction_type, reason, reference_id)
  VALUES (p_user_id, -p_points, 'spent', p_reason, p_reference_id);
  
  UPDATE public.user_profiles
  SET strand_points = strand_points - p_points,
      updated_at = NOW()
  WHERE id = p_user_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges(p_user_id UUID)
RETURNS void AS $$
DECLARE
  badge_record RECORD;
  user_stats RECORD;
BEGIN
  -- Get user statistics
  SELECT 
    strand_points,
    (SELECT COUNT(*) FROM public.quiz_attempts WHERE user_id = p_user_id AND passed = true) as quiz_count,
    (SELECT COUNT(*) FROM public.content_unlocks WHERE user_id = p_user_id AND note_id IS NOT NULL) as notes_read,
    (SELECT COUNT(*) FROM public.discussions WHERE user_id = p_user_id) as comments_count
  INTO user_stats
  FROM public.user_profiles
  WHERE id = p_user_id;
  
  -- Check each badge requirement
  FOR badge_record IN 
    SELECT * FROM public.badges 
    WHERE is_active = true 
    AND id NOT IN (SELECT badge_id FROM public.user_badges WHERE user_id = p_user_id)
  LOOP
    CASE badge_record.requirement_type
      WHEN 'quiz_count' THEN
        IF user_stats.quiz_count >= badge_record.requirement_value THEN
          INSERT INTO public.user_badges (user_id, badge_id) VALUES (p_user_id, badge_record.id);
          PERFORM award_points(p_user_id, badge_record.points_reward, 'Badge earned: ' || badge_record.name, badge_record.id);
        END IF;
      WHEN 'notes_read' THEN
        IF user_stats.notes_read >= badge_record.requirement_value THEN
          INSERT INTO public.user_badges (user_id, badge_id) VALUES (p_user_id, badge_record.id);
          PERFORM award_points(p_user_id, badge_record.points_reward, 'Badge earned: ' || badge_record.name, badge_record.id);
        END IF;
      WHEN 'points_total' THEN
        IF user_stats.strand_points >= badge_record.requirement_value THEN
          INSERT INTO public.user_badges (user_id, badge_id) VALUES (p_user_id, badge_record.id);
          PERFORM award_points(p_user_id, badge_record.points_reward, 'Badge earned: ' || badge_record.name, badge_record.id);
        END IF;
      WHEN 'comments_count' THEN
        IF user_stats.comments_count >= badge_record.requirement_value THEN
          INSERT INTO public.user_badges (user_id, badge_id) VALUES (p_user_id, badge_record.id);
          PERFORM award_points(p_user_id, badge_record.points_reward, 'Badge earned: ' || badge_record.name, badge_record.id);
        END IF;
    END CASE;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
