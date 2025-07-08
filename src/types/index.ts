
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'learner';
  strandPoints: number;
  avatar?: string;
  badges: Badge[];
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  strands: Strand[];
}

export interface Strand {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  subStrands: SubStrand[];
  progress?: number;
}

export interface SubStrand {
  id: string;
  name: string;
  description: string;
  strandId: string;
  notes: Note[];
  quizzes: Quiz[];
  progress?: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  preview: string;
  subStrandId: string;
  authorId: string;
  authorName: string;
  isPremium: boolean;
  price?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  isUnlocked?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subStrandId: string;
  questions: Question[];
  timeLimit?: number;
  isPremium: boolean;
  price?: number;
  attempts: QuizAttempt[];
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'gap-fill';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Answer[];
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
}

export interface Answer {
  questionId: string;
  selectedAnswer: string | number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  earnedAt?: string;
}

export interface Discussion {
  id: string;
  noteId: string;
  userId: string;
  userName: string;
  content: string;
  replies: Discussion[];
  createdAt: string;
  likes: number;
}
