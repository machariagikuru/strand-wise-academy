import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';

export default function Premium() {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Access to basic subjects',
        'Limited quizzes per day',
        'Community support',
        'Basic progress tracking'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'Unlock your full potential',
      features: [
        'Access to all subjects',
        'Unlimited quizzes',
        'Priority support',
        'Advanced analytics',
        'Offline access',
        'Custom study plans',
        'Early access to new content'
      ],
      popular: true
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: 'month',
      description: 'For serious learners',
      features: [
        'Everything in Premium',
        'One-on-one tutoring sessions',
        'Custom content creation',
        'API access',
        'White-label solutions',
        'Advanced integrations'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-accent mr-2" />
            <h1 className="text-4xl font-bold">Choose Your Plan</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features and accelerate your learning journey with our affordable plans.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period !== 'forever' && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Basic' ? 'Get Started' : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Premium?</h2>
            <p className="text-lg text-muted-foreground">
              Discover the benefits that make premium worth every penny
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Accelerated Learning',
                description: 'Advanced AI-powered study recommendations tailored to your learning style'
              },
              {
                icon: Star,
                title: 'Premium Content',
                description: 'Access exclusive materials created by top educators and industry experts'
              },
              {
                icon: Crown,
                title: 'Priority Support',
                description: 'Get help when you need it with our dedicated premium support team'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                question: 'Can I cancel anytime?',
                answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'We offer a 7-day free trial for all premium plans. No credit card required to get started.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
              },
              {
                question: 'Do you offer student discounts?',
                answer: 'Yes! Students can get 50% off any premium plan with a valid student email address.'
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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