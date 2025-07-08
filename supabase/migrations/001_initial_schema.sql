
-- Enable RLS on all tables
ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO anon, authenticated;

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'learner');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE withdrawal_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

-- Extend auth.users with our custom fields
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'learner',
  strand_points INTEGER DEFAULT 100,
  avatar_url TEXT,
  phone TEXT,
  grade TEXT,
  school TEXT,
  bio TEXT,
  earnings DECIMAL(10,2) DEFAULT 0.00,
  total_withdrawals DECIMAL(10,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'book',
  color TEXT DEFAULT '#3B82F6',
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Strands table
CREATE TABLE public.strands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(subject_id, slug)
);

-- Sub-strands table
CREATE TABLE public.sub_strands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  strand_id UUID REFERENCES public.strands(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(strand_id, slug)
);

-- Notes table
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  preview TEXT,
  sub_strand_id UUID REFERENCES public.sub_strands(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  is_premium BOOLEAN DEFAULT false,
  price DECIMAL(10,2) DEFAULT 0.00,
  points_required INTEGER DEFAULT 0,
  status content_status DEFAULT 'draft',
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  featured_image_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  shares_required INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Quizzes table
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  sub_strand_id UUID REFERENCES public.sub_strands(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  is_premium BOOLEAN DEFAULT false,
  price DECIMAL(10,2) DEFAULT 0.00,
  points_required INTEGER DEFAULT 0,
  time_limit INTEGER, -- in minutes
  status content_status DEFAULT 'draft',
  pass_score INTEGER DEFAULT 70,
  views INTEGER DEFAULT 0,
  attempts_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'gap-fill')),
  options JSONB, -- for MCQ options
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz attempts table
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_spent INTEGER, -- in seconds
  answers JSONB NOT NULL, -- store all answers
  passed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'award',
  color TEXT DEFAULT '#F59E0B',
  requirement_type TEXT NOT NULL, -- 'quiz_count', 'points', 'streak', etc.
  requirement_value INTEGER NOT NULL,
  points_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User badges (earned badges)
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Content unlocks (purchases/unlocks)
CREATE TABLE public.content_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  note_id UUID REFERENCES public.notes(id) ON DELETE CASCADE NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NULL,
  unlock_method TEXT NOT NULL CHECK (unlock_method IN ('payment', 'points', 'share')),
  amount_paid DECIMAL(10,2),
  points_spent INTEGER,
  shares_count INTEGER,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  CHECK (
    (note_id IS NOT NULL AND quiz_id IS NULL) OR 
    (note_id IS NULL AND quiz_id IS NOT NULL)
  )
);

-- Discussions/Comments table
CREATE TABLE public.discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID REFERENCES public.notes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  payment_method TEXT NOT NULL, -- 'mpesa', 'airtel', 'stripe'
  transaction_id TEXT UNIQUE,
  phone_number TEXT,
  status payment_status DEFAULT 'pending',
  purpose TEXT NOT NULL, -- 'content_unlock', 'points_purchase'
  reference_id UUID, -- can reference note_id, quiz_id, etc.
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Withdrawals table
CREATE TABLE public.withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT NOT NULL DEFAULT 'mpesa',
  phone_number TEXT,
  account_details JSONB DEFAULT '{}',
  status withdrawal_status DEFAULT 'pending',
  admin_notes TEXT,
  processed_by UUID REFERENCES public.user_profiles(id),
  requested_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);

-- User progress tracking
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  strand_id UUID REFERENCES public.strands(id) ON DELETE CASCADE,
  sub_strand_id UUID REFERENCES public.sub_strands(id) ON DELETE CASCADE,
  notes_completed INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  total_notes INTEGER DEFAULT 0,
  total_quizzes INTEGER DEFAULT 0,
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,
  last_activity TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, sub_strand_id)
);

-- Point transactions
CREATE TABLE public.point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL, -- positive for earned, negative for spent
  transaction_type TEXT NOT NULL, -- 'earned', 'spent', 'admin_adjustment'
  reason TEXT NOT NULL,
  reference_id UUID, -- can reference various content
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for better performance
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_notes_author ON public.notes(author_id);
CREATE INDEX idx_notes_sub_strand ON public.notes(sub_strand_id);
CREATE INDEX idx_notes_status ON public.notes(status);
CREATE INDEX idx_quizzes_sub_strand ON public.quizzes(sub_strand_id);
CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);
CREATE INDEX idx_content_unlocks_user ON public.content_unlocks(user_id);
CREATE INDEX idx_discussions_note ON public.discussions(note_id);
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sub_strands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
