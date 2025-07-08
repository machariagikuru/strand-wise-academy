
-- User Profiles Policies
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile" ON public.user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Subjects Policies (public read)
CREATE POLICY "Anyone can view active subjects" ON public.subjects
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage subjects" ON public.subjects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Strands Policies
CREATE POLICY "Anyone can view active strands" ON public.strands
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage strands" ON public.strands
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Sub-strands Policies
CREATE POLICY "Anyone can view active sub-strands" ON public.sub_strands
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage sub-strands" ON public.sub_strands
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notes Policies
CREATE POLICY "Anyone can view published notes" ON public.notes
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can view own notes" ON public.notes
  FOR SELECT USING (author_id = auth.uid());

CREATE POLICY "Teachers can create notes" ON public.notes
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Authors can update own notes" ON public.notes
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all notes" ON public.notes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Quizzes Policies
CREATE POLICY "Anyone can view published quizzes" ON public.quizzes
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can view own quizzes" ON public.quizzes
  FOR SELECT USING (author_id = auth.uid());

CREATE POLICY "Teachers can create quizzes" ON public.quizzes
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Authors can update own quizzes" ON public.quizzes
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all quizzes" ON public.quizzes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Quiz Questions Policies
CREATE POLICY "Anyone can view questions for published quizzes" ON public.quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE id = quiz_id AND status = 'published'
    )
  );

CREATE POLICY "Quiz authors can manage questions" ON public.quiz_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE id = quiz_id AND author_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all questions" ON public.quiz_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Quiz Attempts Policies
CREATE POLICY "Users can view own attempts" ON public.quiz_attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Teachers can view attempts for their quizzes" ON public.quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE id = quiz_id AND author_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all attempts" ON public.quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Badges Policies
CREATE POLICY "Anyone can view active badges" ON public.badges
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage badges" ON public.badges
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User Badges Policies
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Anyone can view user badges" ON public.user_badges
  FOR SELECT USING (true);

CREATE POLICY "System can insert badges" ON public.user_badges
  FOR INSERT WITH CHECK (true);

-- Content Unlocks Policies
CREATE POLICY "Users can view own unlocks" ON public.content_unlocks
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own unlocks" ON public.content_unlocks
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Teachers can view unlocks for their content" ON public.content_unlocks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.notes 
      WHERE id = note_id AND author_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE id = quiz_id AND author_id = auth.uid()
    )
  );

-- Discussions Policies
CREATE POLICY "Anyone can view approved discussions" ON public.discussions
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can create discussions" ON public.discussions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own discussions" ON public.discussions
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all discussions" ON public.discussions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Payments Policies
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own payments" ON public.payments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Withdrawals Policies
CREATE POLICY "Teachers can view own withdrawals" ON public.withdrawals
  FOR SELECT USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can create withdrawals" ON public.withdrawals
  FOR INSERT WITH CHECK (
    teacher_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'teacher'
    )
  );

CREATE POLICY "Admins can manage all withdrawals" ON public.withdrawals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User Progress Policies
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can manage progress" ON public.user_progress
  FOR ALL WITH CHECK (true);

-- Point Transactions Policies
CREATE POLICY "Users can view own transactions" ON public.point_transactions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create transactions" ON public.point_transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all transactions" ON public.point_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
