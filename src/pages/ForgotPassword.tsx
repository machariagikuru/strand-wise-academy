import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement password reset logic with Supabase
      // await supabase.auth.resetPasswordForEmail(email)
      
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
        toast.success('Password reset email sent!');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">StrandNotes</span>
          </Link>
          <p className="text-blue-200 mt-2">Reset your password</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Check your email and follow the instructions to reset your password.
                  Don't forget to check your spam folder!
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try Different Email
                  </Button>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center text-gray-600 mb-6">
                  <p>Enter your email address and we'll send you a link to reset your password.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <div className="text-center space-y-2">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}