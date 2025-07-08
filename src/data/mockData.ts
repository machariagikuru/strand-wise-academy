import { ApiService } from '@/services/api';
import { Subject, Note, Quiz, Strand, SubStrand } from '@/types';

// Keep original mock data as fallback, but primarily use Supabase data
export const mockSubjects: Subject[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'English',
    description: 'Master the English language through grammar, literature, and writing',
    icon: 'book-open',
    color: '#3B82F6',
    strands: [
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Grammar',
        description: 'Essential grammar rules and structures',
        subjectId: '550e8400-e29b-41d4-a716-446655440001',
        subStrands: [
          {
            id: '550e8400-e29b-41d4-a716-446655440021',
            name: 'Noun Usage',
            description: 'Types of nouns and their proper usage',
            strandId: '550e8400-e29b-41d4-a716-446655440011',
            notes: [],
            quizzes: [],
            progress: 75
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440022',
            name: 'Verb Tenses',
            description: 'Past, present, and future tense structures',
            strandId: '550e8400-e29b-41d4-a716-446655440011',
            notes: [],
            quizzes: [],
            progress: 60
          }
        ],
        progress: 68
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Literature',
        description: 'Poetry, novels, and literary analysis',
        subjectId: '550e8400-e29b-41d4-a716-446655440001',
        subStrands: [
          {
            id: '550e8400-e29b-41d4-a716-446655440025',
            name: 'Poetry Analysis',
            description: 'Understanding poetic devices and themes',
            strandId: '550e8400-e29b-41d4-a716-446655440012',
            notes: [],
            quizzes: [],
            progress: 45
          }
        ],
        progress: 45
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Mathematics',
    description: 'Explore numbers, equations, and mathematical concepts',
    icon: 'calculator',
    color: '#10B981',
    strands: [
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        name: 'Algebra',
        description: 'Variables, equations, and algebraic expressions',
        subjectId: '550e8400-e29b-41d4-a716-446655440002',
        subStrands: [
          {
            id: '550e8400-e29b-41d4-a716-446655440031',
            name: 'Linear Equations',
            description: 'Solving equations with one variable',
            strandId: '550e8400-e29b-41d4-a716-446655440013',
            notes: [],
            quizzes: [],
            progress: 80
          }
        ],
        progress: 80
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Science',
    description: 'Discover the wonders of physics, chemistry, and biology',
    icon: 'microscope',
    color: '#8B5CF6',
    strands: [
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        name: 'Biology',
        description: 'Study of living organisms and life processes',
        subjectId: '550e8400-e29b-41d4-a716-446655440003',
        subStrands: [
          {
            id: '550e8400-e29b-41d4-a716-446655440041',
            name: 'Cell Structure',
            description: 'Understanding cellular components and functions',
            strandId: '550e8400-e29b-41d4-a716-446655440014',
            notes: [],
            quizzes: [],
            progress: 55
          }
        ],
        progress: 55
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'History',
    description: 'Journey through time and learn about past civilizations',
    icon: 'clock',
    color: '#F59E0B',
    strands: [
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        name: 'World History',
        description: 'Major events and civilizations throughout history',
        subjectId: '550e8400-e29b-41d4-a716-446655440004',
        subStrands: [
          {
            id: '550e8400-e29b-41d4-a716-446655440051',
            name: 'Ancient Civilizations',
            description: 'Early human societies and their development',
            strandId: '550e8400-e29b-41d4-a716-446655440015',
            notes: [],
            quizzes: [],
            progress: 30
          }
        ],
        progress: 30
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Geography',
    description: 'Explore the world, maps, and geographical phenomena',
    icon: 'map',
    color: '#EF4444',
    strands: [
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        name: 'Physical Geography',
        description: 'Natural features and processes of the Earth',
        subjectId: '550e8400-e29b-41d4-a716-446655440005',
        subStrands: [
          {
            id: '550e8400-e29b-41d4-a716-446655440061',
            name: 'Climate and Weather',
            description: 'Understanding weather patterns and climate zones',
            strandId: '550e8400-e29b-41d4-a716-446655440016',
            notes: [],
            quizzes: [],
            progress: 65
          }
        ],
        progress: 65
      }
    ]
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Introduction to Nouns',
    content: 'A comprehensive guide to understanding different types of nouns and their usage in English grammar.',
    preview: 'Learn about common nouns, proper nouns, abstract nouns, and collective nouns with examples.',
    subStrandId: '550e8400-e29b-41d4-a716-446655440021',
    authorId: '2',
    authorName: 'Jane Teacher',
    isPremium: false,
    tags: ['grammar', 'nouns', 'basics'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 245,
    likes: 18,
    isUnlocked: true
  },
  {
    id: '2',
    title: 'Advanced Verb Tenses',
    content: 'Master complex verb tenses including perfect continuous and conditional forms.',
    preview: 'Deep dive into advanced English verb tenses with practical examples and exercises.',
    subStrandId: '550e8400-e29b-41d4-a716-446655440022',
    authorId: '2',
    authorName: 'Jane Teacher',
    isPremium: true,
    price: 50,
    tags: ['grammar', 'verbs', 'advanced'],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    views: 189,
    likes: 24,
    isUnlocked: false
  },
  {
    id: '3',
    title: 'Poetry Analysis Techniques',
    content: 'Learn how to analyze poetry using literary devices, themes, and structural elements.',
    preview: 'Comprehensive guide to understanding and analyzing poetry for literature students.',
    subStrandId: '550e8400-e29b-41d4-a716-446655440025',
    authorId: '2',
    authorName: 'Jane Teacher',
    isPremium: true,
    price: 75,
    tags: ['literature', 'poetry', 'analysis'],
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    views: 156,
    likes: 31,
    isUnlocked: false
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Noun Types Quiz',
    description: 'Test your knowledge of different types of nouns',
    subStrandId: '550e8400-e29b-41d4-a716-446655440021',
    questions: [
      {
        id: '1',
        text: 'Which of the following is a proper noun?',
        type: 'mcq',
        options: ['city', 'London', 'building', 'river'],
        correctAnswer: 1,
        explanation: 'London is a proper noun because it names a specific place.'
      },
      {
        id: '2',
        text: 'What type of noun is "happiness"?',
        type: 'mcq',
        options: ['concrete', 'abstract', 'collective', 'compound'],
        correctAnswer: 1,
        explanation: 'Happiness is an abstract noun because it represents an emotion or concept.'
      }
    ],
    timeLimit: 10,
    isPremium: false,
    attempts: [],
    createdAt: '2024-01-16T11:00:00Z'
  },
  {
    id: '2',
    title: 'Verb Tenses Challenge',
    description: 'Advanced quiz on complex verb tenses',
    subStrandId: '550e8400-e29b-41d4-a716-446655440022',
    questions: [
      {
        id: '3',
        text: 'Complete the sentence: "By next year, I _____ studying for five years."',
        type: 'gap-fill',
        correctAnswer: 'will have been',
        explanation: 'This requires the future perfect continuous tense.'
      }
    ],
    timeLimit: 15,
    isPremium: true,
    price: 30,
    attempts: [],
    createdAt: '2024-01-21T16:45:00Z'
  }
];

// Wrapper functions to get real data from Supabase
export const getSubjects = () => ApiService.getSubjects();
export const getNotes = (limit?: number) => ApiService.getNotes(undefined, limit);
export const getQuizzes = (limit?: number) => ApiService.getQuizzes(undefined, limit);
