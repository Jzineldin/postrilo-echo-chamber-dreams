
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Star, Calendar, DollarSign, Loader2, RefreshCw } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

export const BillingSettings = () => {
  const { 
    subscribed, 
    subscriptionTier, 
    planName, 
    monthlyPostsLimit, 
    subscriptionEnd,
    postsUsedThisMonth,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal
  } = useSubscription();

  const [billingHistory] = useState([
    { date: '2024-01-15', amount: '$29.00', status: 'Paid', invoice: 'INV-001' },
    { date: '2023-12-15', amount: '$29.00', status: 'Paid', invoice: 'INV-002' },
    { date: '2023-11-15', amount: '$29.00', status: 'Paid', invoice: 'INV-003' }
  ]);

  const [paymentMethod] = useState({
    type: 'Visa',
    last4: '4242',
    expires: '12/25'
  });

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      features: ['5 AI posts/month', '3 brand voices', 'Basic templates'],
      current: planName === 'Free',
      stripePlanName: null
    },
    {
      name: 'Creator',
      price: '$9.99',
      period: 'month',
      features: ['50 AI posts/month', '50 brand voices', 'Multi-platform publishing', 'Analytics dashboard'],
      current: planName === 'Creator',
      stripePlanName: 'Creator'
    },
    {
      name: 'Business',
      price: '$19.99',
      period: 'month',
      features: ['Unlimited AI posts', 'Unlimited brand voices', 'Team collaboration', 'Priority support', 'Custom integrations'],
      current: planName === 'Business',
      stripePlanName: 'Business'
    }
  ];

  const handlePlanChange = async (plan: any) => {
    if (plan.stripePlanName) {
      await createCheckout(plan.stripePlanName);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Current Plan
            <Button
              variant="ghost"
              size="sm"
              onClick={checkSubscription}
              disabled={loading}
              className="ml-auto"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{planName}</h3>
              <p className="text-gray-600">
                {planName === 'Free' ? 'Free forever' : `$${planName === 'Creator' ? '9.99' : '19.99'}/month`}
              </p>
            </div>
            <Badge className={subscribed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {subscribed ? "Active" : "Free"}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                {monthlyPostsLimit === 999999 ? 'Unlimited' : monthlyPostsLimit} AI posts per month
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                Posts used this month: {postsUsedThisMonth}/{monthlyPostsLimit === 999999 ? '∞' : monthlyPostsLimit}
              </span>
            </div>
          </div>
          
          {subscribed && subscriptionEnd && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Calendar className="w-4 h-4" />
              Next billing date: {formatDate(subscriptionEnd)}
            </div>
          )}

          {subscribed && (
            <Button
              variant="outline"
              onClick={openCustomerPortal}
              className="w-full sm:w-auto"
            >
              Manage Subscription
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Plan Options */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.name} className={`border rounded-lg p-4 ${plan.current ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{plan.name}</h4>
                  {plan.current && <Badge className="bg-green-100 text-green-800">Current</Badge>}
                </div>
                
                <p className="text-2xl font-bold mb-3">
                  {plan.price}<span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                </p>
                
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.current ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.current || loading}
                  onClick={() => handlePlanChange(plan)}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      {subscribed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{paymentMethod.type} ending in {paymentMethod.last4}</p>
                  <p className="text-sm text-gray-600">Expires {paymentMethod.expires}</p>
                </div>
              </div>
              <Button variant="outline" onClick={openCustomerPortal}>
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      {subscribed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billingHistory.map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{bill.date}</p>
                      <p className="text-sm text-gray-600">{bill.invoice}</p>
                    </div>
                    <div>
                      <p className="font-medium">{bill.amount}</p>
                      <Badge variant={bill.status === 'Paid' ? 'default' : 'destructive'}>
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
