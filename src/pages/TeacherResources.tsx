import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, Video, FileText, MessageCircle, Users, Award } from 'lucide-react';

export default function TeacherResources() {
  const resources = [
    {
      id: 1,
      title: 'Content Creation Guide',
      description: 'Learn how to create engaging educational content that students love',
      type: 'Guide',
      category: 'content',
      downloads: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Quiz Design Best Practices',
      description: 'Master the art of creating effective quizzes and assessments',
      type: 'Video',
      category: 'assessment',
      downloads: 890,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Student Engagement Templates',
      description: 'Ready-to-use templates for boosting student participation',
      type: 'Template',
      category: 'engagement',
      downloads: 2100,
      rating: 4.7
    }
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah Johnson',
      role: 'Mathematics Teacher',
      title: 'Tips for making algebra fun and engaging',
      replies: 23,
      likes: 67,
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Michael Chen',
      role: 'Science Teacher',
      title: 'Using real-world examples in physics lessons',
      replies: 15,
      likes: 45,
      time: '5 hours ago'
    },
    {
      id: 3,
      author: 'Emma Rodriguez',
      role: 'Biology Teacher',
      title: 'Interactive diagrams that boost understanding',
      replies: 31,
      likes: 89,
      time: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold">Teacher Resources</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create amazing content and grow as an educator on StrandNotes.
          </p>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">150+</div>
                  <p className="text-sm text-muted-foreground">Guides & Templates</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">75+</div>
                  <p className="text-sm text-muted-foreground">Video Tutorials</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">500+</div>
                  <p className="text-sm text-muted-foreground">Active Teachers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8★</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{resource.rating}★</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Community Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{post.author}</h3>
                            <Badge variant="outline" className="text-xs">{post.role}</Badge>
                          </div>
                          <h4 className="font-semibold mb-2">{post.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="w-4 h-4" />
                              <span>{post.likes} likes</span>
                            </div>
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="outline">View All Discussions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2 text-sm">
                    <a href="#" className="block text-primary hover:underline">Content Creation Guidelines</a>
                    <a href="#" className="block text-primary hover:underline">Payment & Earnings FAQ</a>
                    <a href="#" className="block text-primary hover:underline">Community Guidelines</a>
                    <a href="#" className="block text-primary hover:underline">Technical Requirements</a>
                    <a href="#" className="block text-primary hover:underline">Teacher Agreement</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}