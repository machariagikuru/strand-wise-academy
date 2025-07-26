import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSubjects } from '@/data/mockData';
import { BookOpen, Clock, Award, Users, ArrowLeft, Play, FileText } from 'lucide-react';

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const subject = mockSubjects.find(s => s.id.toString() === id);
  
  if (!subject) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Subject Not Found</h1>
            <p className="text-muted-foreground mb-4">The subject you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/subjects')}>
              Back to Subjects
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/subjects')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Subjects
        </Button>

        {/* Subject Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
                  <p className="text-muted-foreground mb-4">{subject.description}</p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>{subject.strands.length} Strands</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>1,245 Learners</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span>Up to 500 Points</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strands */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Subject Strands</h2>
          
          <div className="grid gap-6">
            {subject.strands.map((strand, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{strand.name}</CardTitle>
                      <p className="text-muted-foreground mt-1">{strand.description}</p>
                    </div>
                    <Badge variant="outline">
                      Free
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{strand.progress || 0}%</span>
                      </div>
                      <Progress value={strand.progress || 0} className="h-2" />
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>5 Notes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="w-4 h-4" />
                        <span>3 Quizzes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>~2 hours</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1">
                        {strand.progress && strand.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Button>
                      <Button variant="outline">
                        Take Quiz
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}