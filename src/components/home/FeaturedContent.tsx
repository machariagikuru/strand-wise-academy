
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSubjects } from '@/data/mockData';
import { BookOpen, Clock, Eye, Heart, Lock, Play, Star } from 'lucide-react';

export function FeaturedContent() {
  const latestNotes = mockSubjects
    .flatMap(subject => subject.strands)
    .flatMap(strand => strand.subStrands)
    .flatMap(subStrand => subStrand.notes)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const latestQuizzes = mockSubjects
    .flatMap(subject => subject.strands)
    .flatMap(strand => strand.subStrands)
    .flatMap(subStrand => subStrand.quizzes)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Latest Notes */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Study Notes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fresh content from our expert educators to enhance your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNotes.map((note) => (
              <Card key={note.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {note.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">by {note.authorName}</p>
                    </div>
                    {note.isPremium && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {note.preview}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {note.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{note.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{note.likes}</span>
                      </div>
                    </div>
                    <time className="text-xs">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={note.isPremium ? "outline" : "default"}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {note.isPremium ? `Unlock for ${note.price} pts` : 'Read Note'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Latest Quizzes */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Challenge Yourself</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Test your knowledge with our interactive quizzes and track your progress
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestQuizzes.map((quiz) => (
              <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {quiz.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{quiz.questions.length} questions</p>
                    </div>
                    {quiz.isPremium && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {quiz.timeLimit && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(quiz.timeLimit / 60)} min</span>
                      </div>
                    )}
                    <div className="text-xs">
                      {quiz.attempts.length} attempts
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={quiz.isPremium ? "outline" : "default"}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {quiz.isPremium ? `Unlock for ${quiz.price} pts` : 'Start Quiz'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
