
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Users, Zap, Target, Shield } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Notes',
      description: 'Access detailed study materials crafted by expert educators across all subjects.',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging quizzes and receive instant feedback.',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Collect StrandPoints and unlock badges as you progress through your learning journey.',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join discussions, ask questions, and learn together with fellow students.',
      color: 'bg-orange-500'
    },
    {
      icon: Zap,
      title: 'Premium Content',
      description: 'Access exclusive materials and advanced features with premium subscriptions.',
      color: 'bg-yellow-500'
    },
    {
      icon: Shield,
      title: 'Trusted Platform',
      description: 'Learn with confidence on our secure, reliable educational platform.',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">Why Choose StrandNotes</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with proven educational methods to create 
                an engaging and effective learning experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FeaturedContent />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of students who are already mastering their subjects with StrandNotes. 
              Start your journey today and unlock your full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Start Learning Free
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
