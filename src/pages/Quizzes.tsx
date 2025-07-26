import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Clock, Users, Award, Brain } from 'lucide-react';

export default function Quizzes() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const quizzes = [
    {
      id: 1,
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      questions: 15,
      duration: '20 mins',
      difficulty: 'Beginner',
      participants: 1250,
      points: 150
    },
    {
      id: 2,
      title: 'Cell Biology Basics',
      subject: 'Biology',
      questions: 20,
      duration: '25 mins',
      difficulty: 'Intermediate',
      participants: 890,
      points: 200
    },
    {
      id: 3,
      title: 'World War II',
      subject: 'History',
      questions: 12,
      duration: '15 mins',
      difficulty: 'Advanced',
      participants: 650,
      points: 180
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold">Interactive Quizzes</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge with our engaging quizzes. Earn StrandPoints and compete with other learners.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <Badge variant="secondary">{quiz.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {quiz.duration}
                    </span>
                    <span>{quiz.questions} questions</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant={quiz.difficulty === 'Beginner' ? 'secondary' : quiz.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                      {quiz.difficulty}
                    </Badge>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {quiz.participants}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="flex items-center text-accent font-medium">
                      <Award className="w-4 h-4 mr-1" />
                      {quiz.points} pts
                    </span>
                    <Button size="sm">Start Quiz</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}