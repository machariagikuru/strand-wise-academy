import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, Star, Crown } from 'lucide-react';

export default function Leaderboard() {
  const topLearners = [
    { id: 1, name: 'Sarah Johnson', points: 15420, rank: 1, avatar: 'SJ', badges: 12, streak: 28 },
    { id: 2, name: 'Michael Chen', points: 14850, rank: 2, avatar: 'MC', badges: 10, streak: 23 },
    { id: 3, name: 'Emma Rodriguez', points: 14200, rank: 3, avatar: 'ER', badges: 11, streak: 19 },
    { id: 4, name: 'David Kim', points: 13750, rank: 4, avatar: 'DK', badges: 9, streak: 15 },
    { id: 5, name: 'Lisa Thompson', points: 13200, rank: 5, avatar: 'LT', badges: 8, streak: 12 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how you rank against other learners. Compete, learn, and climb to the top!
          </p>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {topLearners.slice(0, 3).map((learner, index) => (
                <Card key={learner.id} className={`text-center ${index === 0 ? 'md:order-2 bg-gradient-to-b from-yellow-50 to-white border-yellow-200' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col items-center space-y-2">
                      {getRankIcon(learner.rank)}
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary text-white text-lg">
                          {learner.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{learner.name}</h3>
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-4 h-4 text-accent" />
                          <span className="text-accent font-medium">{learner.points.toLocaleString()} pts</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {learner.badges}
                      </div>
                      <div>{learner.streak} day streak</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rest of Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLearners.slice(3).map((learner) => (
                    <div key={learner.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        {getRankIcon(learner.rank)}
                        <Avatar>
                          <AvatarFallback className="bg-primary text-white">
                            {learner.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{learner.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              {learner.badges} badges
                            </span>
                            <span>•</span>
                            <span>{learner.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="font-medium">{learner.points.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Monthly leaderboard coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alltime">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">All-time leaderboard coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}