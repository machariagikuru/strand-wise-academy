
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Trophy, Users, Star } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  const stats = [
    { icon: BookOpen, label: 'Notes', value: '1,000+' },
    { icon: Trophy, label: 'Quizzes', value: '500+' },
    { icon: Users, label: 'Learners', value: '10,000+' },
    { icon: Star, label: 'Success Rate', value: '94%' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl transform -translate-x-48 translate-y-48"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Master Every
                <span className="block text-accent">Strand</span>
                One Note at a Time
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Transform your learning journey with our comprehensive educational platform. 
                Access premium notes, interactive quizzes, and earn rewards as you progress.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/register')}
              >
                Start Learning Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/subjects')}
              >
                Explore Subjects
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Interactive Learning</h3>
                        <p className="text-blue-200 text-sm">Engaging content with multimedia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Gamified Progress</h3>
                        <p className="text-blue-200 text-sm">Earn points and unlock badges</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Premium Content</h3>
                        <p className="text-blue-200 text-sm">Access exclusive materials</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-green-500/30 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
