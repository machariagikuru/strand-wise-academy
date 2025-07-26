import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Brain, Video, Upload } from 'lucide-react';

export default function CreateContent() {
  const contentTypes = [
    {
      icon: FileText,
      title: 'Create Notes',
      description: 'Write comprehensive study materials and notes for students',
      action: 'Create Notes',
      color: 'bg-blue-500'
    },
    {
      icon: Brain,
      title: 'Design Quiz',
      description: 'Create interactive quizzes to test student knowledge',
      action: 'Create Quiz',
      color: 'bg-green-500'
    },
    {
      icon: Video,
      title: 'Upload Video',
      description: 'Share video lessons and tutorials with students',
      action: 'Upload Video',
      color: 'bg-purple-500'
    },
    {
      icon: Upload,
      title: 'Upload Resource',
      description: 'Share additional learning resources and materials',
      action: 'Upload Resource',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <PlusCircle className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold">Create Content</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your knowledge with students by creating engaging educational content.
            Earn money while helping others learn.
          </p>
        </div>

        {/* Content Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contentTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <Button className="w-full">{type.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Active Teachers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Content Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$50,000+</div>
              <p className="text-muted-foreground">Paid to Teachers</p>
            </CardContent>
          </Card>
        </div>

        {/* Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Content Creation Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Quality Standards</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Content must be original and well-researched</li>
                  <li>• Use clear, easy-to-understand language</li>
                  <li>• Include examples and practical applications</li>
                  <li>• Provide accurate and up-to-date information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Formatting Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use headings and subheadings for structure</li>
                  <li>• Include images and diagrams where helpful</li>
                  <li>• Break content into digestible sections</li>
                  <li>• Add interactive elements when possible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}