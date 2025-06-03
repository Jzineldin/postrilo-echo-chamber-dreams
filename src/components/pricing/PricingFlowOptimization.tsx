
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader, ArrowRight, Star, Zap, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FlowState {
  step: 'idle' | 'selecting' | 'processing' | 'success' | 'error';
  selectedPlan: string | null;
  loadingMessage: string;
}

interface PricingFlowOptimizationProps {
  onPlanSelect: (planName: string) => Promise<void>;
  currentPlan?: string;
}

export const PricingFlowOptimization = ({ onPlanSelect, currentPlan }: PricingFlowOptimizationProps) => {
  const [flowState, setFlowState] = useState<FlowState>({
    step: 'idle',
    selectedPlan: null,
    loadingMessage: ''
  });
  const { toast } = useToast();

  const loadingMessages = [
    "Preparing your upgrade...",
    "Setting up your new plan...",
    "Connecting to Stripe...",
    "Almost ready..."
  ];

  useEffect(() => {
    if (flowState.step === 'processing') {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setFlowState(prev => ({
          ...prev,
          loadingMessage: loadingMessages[messageIndex]
        }));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [flowState.step]);

  const handlePlanSelection = async (planName: string) => {
    setFlowState({
      step: 'selecting',
      selectedPlan: planName,
      loadingMessage: 'Preparing your upgrade...'
    });

    // Small delay to show selection feedback
    setTimeout(async () => {
      setFlowState(prev => ({ ...prev, step: 'processing' }));
      
      try {
        await onPlanSelect(planName);
        
        setFlowState(prev => ({ ...prev, step: 'success' }));
        
        toast({
          title: "Plan Selected Successfully!",
          description: `You've selected the ${planName} plan. Redirecting to checkout...`,
        });

        // Reset state after success
        setTimeout(() => {
          setFlowState({ step: 'idle', selectedPlan: null, loadingMessage: '' });
        }, 3000);
        
      } catch (error) {
        setFlowState(prev => ({ ...prev, step: 'error' }));
        
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });

        // Reset state after error
        setTimeout(() => {
          setFlowState({ step: 'idle', selectedPlan: null, loadingMessage: '' });
        }, 2000);
      }
    }, 800);
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Creator': return <Star className="w-5 h-5 text-purple-600" />;
      case 'Business': return <Crown className="w-5 h-5 text-orange-600" />;
      default: return <Zap className="w-5 h-5 text-blue-600" />;
    }
  };

  const plans = [
    {
      name: "Creator",
      price: "$9.99",
      popular: true,
      features: ["50 posts/month", "All platforms", "Hashtag research"]
    },
    {
      name: "Business", 
      price: "$19.99",
      popular: false,
      features: ["Unlimited posts", "Team collaboration", "Analytics"]
    }
  ];

  if (flowState.step === 'processing') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Loader className="w-8 h-8 text-purple-600 animate-spin" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {flowState.loadingMessage}
            </h3>
            <p className="text-gray-600">
              Please wait while we prepare your {flowState.selectedPlan} plan
            </p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (flowState.step === 'success') {
    return (
      <Card className="max-w-md mx-auto border-green-200 bg-green-50">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Plan Selected Successfully!
            </h3>
            <p className="text-gray-600">
              Redirecting you to complete your {flowState.selectedPlan} plan upgrade
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-green-600">
            <span className="text-sm font-medium">Opening Stripe checkout</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h3>
        <p className="text-gray-600">
          Select the perfect plan for your content creation needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const isSelected = flowState.selectedPlan === plan.name;
          const isProcessing = flowState.step === 'selecting' && isSelected;
          const isCurrent = currentPlan === plan.name;
          
          return (
            <Card 
              key={plan.name}
              className={`transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-purple-400 border-purple-300 shadow-lg transform scale-105' 
                  : 'hover:shadow-lg hover:border-purple-200'
              } ${isCurrent ? 'border-green-400 bg-green-50' : ''}`}
            >
              <CardContent className="p-6 space-y-4">
                {plan.popular && (
                  <Badge className="bg-purple-600 text-white mb-2">
                    Most Popular
                  </Badge>
                )}
                
                <div className="flex items-center gap-3">
                  {getPlanIcon(plan.name)}
                  <h4 className="text-xl font-bold">{plan.name}</h4>
                  <span className="text-2xl font-bold text-purple-600">
                    {plan.price}
                  </span>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handlePlanSelection(plan.name)}
                  disabled={isProcessing || isCurrent}
                  className={`w-full ${
                    isCurrent 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isProcessing && (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {isCurrent ? 'Current Plan' : `Select ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
