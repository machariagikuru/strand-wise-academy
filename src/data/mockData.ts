
import { Subject, Badge } from '@/types';

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'English',
    description: 'Master the English language through comprehensive grammar, literature, and writing studies',
    icon: '📚',
    color: 'bg-blue-500',
    strands: [
      {
        id: '1',
        name: 'Grammar',
        description: 'Master English grammar fundamentals',
        subjectId: '1',
        progress: 75,
        subStrands: [
          {
            id: '1',
            name: 'Parts of Speech',
            description: 'Learn about nouns, verbs, adjectives, and more',
            strandId: '1',
            progress: 80,
            notes: [
              {
                id: '1',
                title: 'Introduction to Nouns',
                content: 'A noun is a word that names a person, place, thing, or idea. Nouns are one of the most important parts of speech in English grammar...',
                preview: 'A noun is a word that names a person, place, thing, or idea. Nouns are one of the most important parts of speech...',
                subStrandId: '1',
                authorId: '2',
                authorName: 'Jane Teacher',
                isPremium: false,
                tags: ['grammar', 'nouns', 'basics'],
                createdAt: '2024-01-15',
                updatedAt: '2024-01-15',
                views: 245,
                likes: 18,
                isUnlocked: true
              },
              {
                id: '2',
                title: 'Advanced Verb Tenses',
                content: 'Understanding complex verb tenses is crucial for mastering English. This comprehensive guide covers all 12 tenses...',
                preview: 'Understanding complex verb tenses is crucial for mastering English. This comprehensive guide covers all 12 tenses with detailed examples and practice exercises...',
                subStrandId: '1',
                authorId: '2',
                authorName: 'Jane Teacher',
                isPremium: true,
                price: 50,
                tags: ['grammar', 'verbs', 'advanced'],
                createdAt: '2024-01-20',
                updatedAt: '2024-01-20',
                views: 189,
                likes: 25,
                isUnlocked: false
              }
            ],
            quizzes: [
              {
                id: '1',
                title: 'Parts of Speech Quiz',
                description: 'Test your knowledge of nouns, verbs, adjectives, and adverbs',
                subStrandId: '1',
                timeLimit: 300,
                isPremium: false,
                createdAt: '2024-01-15',
                attempts: [],
                questions: [
                  {
                    id: '1',
                    text: 'Which of the following is a noun?',
                    type: 'mcq',
                    options: ['run', 'quickly', 'beautiful', 'cat'],
                    correctAnswer: 3,
                    explanation: 'A cat is a thing/animal, making it a noun.'
                  },
                  {
                    id: '2',
                    text: 'Identify the verb in the sentence: "She runs every morning."',
                    type: 'mcq',
                    options: ['She', 'runs', 'every', 'morning'],
                    correctAnswer: 1,
                    explanation: 'Runs is the action word, making it a verb.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Literature',
        description: 'Explore poetry, prose, and drama',
        subjectId: '1',
        progress: 45,
        subStrands: [
          {
            id: '2',
            name: 'Poetry Analysis',
            description: 'Learn to analyze and interpret poetry',
            strandId: '2',
            progress: 60,
            notes: [
              {
                id: '3',
                title: 'Understanding Metaphors',
                content: 'Metaphors are powerful literary devices that create vivid imagery by comparing two unlike things...',
                preview: 'Metaphors are powerful literary devices that create vivid imagery by comparing two unlike things without using like or as...',
                subStrandId: '2',
                authorId: '2',
                authorName: 'Jane Teacher',
                isPremium: false,
                tags: ['poetry', 'metaphors', 'analysis'],
                createdAt: '2024-01-18',
                updatedAt: '2024-01-18',
                views: 156,
                likes: 12,
                isUnlocked: true
              }
            ],
            quizzes: []
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Mathematics',
    description: 'Build mathematical thinking through algebra, geometry, and problem-solving',
    icon: '🔢',
    color: 'bg-green-500',
    strands: [
      {
        id: '3',
        name: 'Algebra',
        description: 'Master algebraic concepts and equations',
        subjectId: '2',
        progress: 30,
        subStrands: [
          {
            id: '3',
            name: 'Linear Equations',
            description: 'Solve and graph linear equations',
            strandId: '3',
            progress: 25,
            notes: [],
            quizzes: []
          }
        ]
      }
    ]
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Grammar Master',
    description: 'Complete 10 grammar quizzes with 80% or higher',
    icon: '🏆',
    color: 'bg-yellow-500',
    requirement: 'Complete 10 grammar quizzes with 80% score'
  },
  {
    id: '2',
    name: 'Quiz Champion',
    description: 'Complete 50 quizzes across all subjects',
    icon: '🎯',
    color: 'bg-blue-500',
    requirement: 'Complete 50 quizzes'
  },
  {
    id: '3',
    name: 'Note Enthusiast',
    description: 'Read 100 notes across all subjects',
    icon: '📖',
    color: 'bg-purple-500',
    requirement: 'Read 100 notes'
  },
  {
    id: '4',
    name: 'Discussion Leader',
    description: 'Participate in 25 note discussions',
    icon: '💬',
    color: 'bg-green-500',
    requirement: 'Comment on 25 notes'
  },
  {
    id: '5',
    name: 'Premium Learner',
    description: 'Unlock 20 premium pieces of content',
    icon: '⭐',
    color: 'bg-orange-500',
    requirement: 'Unlock 20 premium items'
  }
];
