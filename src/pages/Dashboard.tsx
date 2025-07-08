
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { mockSubjects, mockBadges } from '@/data/mockData';
import { BookOpen, Trophy, Star, TrendingUp, Clock, Target, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const totalNotes = mockSubjects.reduce((acc, subject) => 
    acc + subject.strands.reduce((subAcc, strand) => 
      subAcc + strand.subStrands.reduce((subSubAcc, subStrand) => 
        subSubAcc + subStrand.notes.length, 0), 0), 0);

  const totalQuizzes = mockSubjects.reduce((acc, subject) => 
    acc + subject.strands.reduce((subAcc, strand) => 
      subAcc + strand.subStrands.reduce((subSubAcc, subStrand) => 
        subSubAcc + subStrand.quizzes.length, 0), 0), 0);

  const overallProgress = Math.round(
    mockSubjects.reduce((acc, subject) => 
      acc + subject.strands.reduce((subAcc, strand) => 
        subAcc + (strand.progress || 0), 0) / subject.strands.length, 0) / mockSubjects.length
  );

  const recentActivity = [
    { type: 'note', title: 'Introduction to Nouns', subject: 'English', time: '2 hours ago' },
    { type: 'quiz', title: 'Parts of Speech Quiz', subject: 'English', score: 85, time: '1 day ago' },
    { type: 'badge', title: 'Grammar Master', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            {user.role === 'learner' && "Ready to continue your learning journey?"}
            {user.role === 'teacher' && "Time to inspire minds and create amazing content!"}
            {user.role === 'admin' && "Manage your platform and support the learning community."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">StrandPoints</p>
                  <p className="text-2xl font-bold">{user.strandPoints}</p>
                </div>
                <Star className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Progress</p>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Badges Earned</p>
                  <p className="text-2xl font-bold">{user.badges.length}</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Study Streak</p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
                <Target className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Subject Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSubjects.map((subject) => {
                  const avgProgress = subject.strands.reduce((acc, strand) => acc + (strand.progress || 0), 0) / subject.strands.length;
                  return (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{subject.icon}</span>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <Badge variant="outline">{Math.round(avgProgress)}%</Badge>
                      </div>
                      <Progress value={avgProgress} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'note' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'note' && <BookOpen className="w-5 h-5" />}
                        {activity.type === 'quiz' && <Target className="w-5 h-5" />}
                        {activity.type === 'badge' && <Trophy className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          {activity.subject && <span>{activity.subject}</span>}
                          {activity.score && <Badge variant="outline" className="text-xs">Score: {activity.score}%</Badge>}
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => navigate('/subjects')}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Subjects
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/quizzes')}>
                  <Target className="w-4 h-4 mr-2" />
                  Take a Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Join Study Group
                </Button>
              </CardContent>
            </Card>

            {/* Available Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Available Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBadges.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 ${badge.color} rounded-full flex items-center justify-center text-white text-sm`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card>
              <CardHeader>
                <CardTitle>Study Streak 🔥</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">7 Days</div>
                  <p className="text-sm text-gray-600 mb-4">Keep it up! You're on fire!</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🔥</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
