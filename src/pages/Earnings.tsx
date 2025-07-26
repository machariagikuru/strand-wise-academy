import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Users, FileText, Calendar } from 'lucide-react';

export default function Earnings() {
  const earnings = {
    total: 2450.00,
    thisMonth: 650.00,
    pending: 125.00,
    withdrawn: 2000.00
  };

  const recentTransactions = [
    { id: 1, type: 'earning', description: 'Mathematics Quiz - Basic Algebra', amount: 45.00, date: '2024-01-15', students: 23 },
    { id: 2, type: 'earning', description: 'Biology Notes - Cell Structure', amount: 32.50, date: '2024-01-14', students: 18 },
    { id: 3, type: 'withdrawal', description: 'Bank Transfer', amount: -500.00, date: '2024-01-10', students: null },
    { id: 4, type: 'earning', description: 'Chemistry Quiz - Periodic Table', amount: 28.00, date: '2024-01-08', students: 15 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold">Earnings Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your earnings, view transaction history, and manage your payouts.
          </p>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">${earnings.total.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">${earnings.thisMonth.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">${earnings.pending.toFixed(2)}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Withdrawn</p>
                  <p className="text-2xl font-bold">${earnings.withdrawn.toFixed(2)}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">Export</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'earning' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'earning' ? (
                            <FileText className="w-5 h-5 text-green-600" />
                          ) : (
                            <DollarSign className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{transaction.date}</span>
                            {transaction.students && (
                              <>
                                <span>•</span>
                                <span>{transaction.students} students</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                        </p>
                        <Badge variant={transaction.type === 'earning' ? 'secondary' : 'outline'}>
                          {transaction.type === 'earning' ? 'Earned' : 'Withdrawn'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-3xl font-bold text-green-600">${(earnings.total - earnings.withdrawn).toFixed(2)}</p>
                </div>
                <Button className="w-full" disabled={earnings.total - earnings.withdrawn < 50}>
                  Request Withdrawal
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Minimum withdrawal amount is $50. Payments are processed within 3-5 business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Create high-quality, engaging content to attract more students</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Regular updates keep students coming back</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Promote your content on social media</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Respond to student questions promptly</p>
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