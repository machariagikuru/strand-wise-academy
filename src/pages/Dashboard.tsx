
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ApiService } from '@/services/api';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Trophy, BookOpen, Target, TrendingUp, Award, Clock, Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [progressData, analyticsData] = await Promise.all([
        ApiService.getUserProgress(),
        user?.role === 'admin' ? ApiService.getAnalytics() : Promise.resolve({})
      ]);

      setProgress(progressData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const renderLearnerDashboard = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">StrandPoints</CardTitle>
            <Star className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.strandPoints}</div>
            <p className="text-xs text-muted-foreground">Available points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.badges.length}</div>
            <p className="text-xs text-muted-foreground">Total achievements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress.length > 0 
                ? `${Math.round(progress.reduce((sum, p) => sum + p.progress_percentage, 0) / progress.length)}%`
                : '0%'
              }
            </div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress by Subject */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Subject Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.subjects.name}</span>
                  <Badge variant="outline">
                    {Math.round(item.progress_percentage)}%
                  </Badge>
                </div>
                <Progress value={item.progress_percentage} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {item.notes_completed}/{item.total_notes} notes • {item.quizzes_completed}/{item.total_quizzes} quizzes
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <div className="font-medium text-sm">{badge.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(badge.earnedAt!).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          {user.badges.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No badges earned yet. Complete quizzes and activities to earn your first badge!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 0.00</div>
            <p className="text-sm text-muted-foreground">Total earnings</p>
            <Button className="mt-4 w-full" variant="outline">
              Request Withdrawal
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Notes & Quizzes</p>
            <Button className="mt-4 w-full">
              Create Content
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Total views</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.users || 0}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.notes || 0}</div>
            <p className="text-xs text-muted-foreground">Published notes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.quizzes || 0}</div>
            <p className="text-xs text-muted-foreground">Total attempts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {analytics.revenue || 0}</div>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              Review Content
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <Target className="h-6 w-6 mb-2" />
              Analytics
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              Financial Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'admin' && 'Manage your platform and monitor performance.'}
            {user.role === 'teacher' && 'Track your content performance and earnings.'}
            {user.role === 'learner' && 'Continue your learning journey and earn more points.'}
          </p>
          <Badge variant="secondary" className="mt-2">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Badge>
        </div>

        {/* Role-specific Dashboard */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {user.role === 'learner' && renderLearnerDashboard()}
            {user.role === 'teacher' && renderTeacherDashboard()}
            {user.role === 'admin' && renderAdminDashboard()}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
