
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap, X, Crown, Rocket } from "lucide-react";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    originalPrice: string | null;
    description: string;
    features: string[];
    limitations: string[];
    buttonText: string;
    popular: boolean;
    stripePlanName: string | null;
  };
  currentPlanName: string;
  loading: boolean;
  onPlanSelect: (plan: any) => void;
}

export const PricingCard = ({ plan, currentPlanName, loading, onPlanSelect }: PricingCardProps) => {
  const getButtonText = () => {
    if (plan.name === currentPlanName) {
      return "Current Plan";
    }
    if (plan.name === 'Free') {
      return "Get Started Free";
    }
    return "Upgrade Now";
  };

  const getPlanIcon = () => {
    switch (plan.name) {
      case 'Free':
        return <Zap className="w-4 h-4 text-blue-600" />;
      case 'Creator':
        return <Star className="w-4 h-4 text-purple-600" />;
      case 'Business':
        return <Crown className="w-4 h-4 text-orange-600" />;
      default:
        return <Rocket className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCardStyle = () => {
    if (plan.name === currentPlanName) {
      return 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-200 shadow-lg';
    }
    if (plan.popular) {
      return 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 ring-2 ring-purple-200 shadow-xl transform lg:scale-105';
    }
    if (plan.name === 'Business') {
      return 'border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 hover:border-orange-400 shadow-md';
    }
    return 'border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 hover:border-blue-400 shadow-md';
  };

  return (
    <Card 
      className={`relative border-2 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full w-full ${getCardStyle()}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 text-sm font-bold shadow-lg">
            <Star className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="whitespace-nowrap">Most Popular</span>
          </Badge>
        </div>
      )}

      {plan.name === currentPlanName && (
        <div className="absolute -top-3 right-4 z-10">
          <Badge className="bg-green-600 text-white border-0 px-3 py-1 text-sm font-bold shadow-lg">
            <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="whitespace-nowrap">Active</span>
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4 pt-6 px-6">
        {/* Plan icon and name */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
            {getPlanIcon()}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            {plan.name}
          </CardTitle>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-gray-900">
              {plan.price}
            </span>
            <span className="text-gray-600 text-base">
              {plan.period}
            </span>
          </div>
          {plan.originalPrice && (
            <div className="text-center space-y-2">
              <div className="text-base text-gray-500 line-through">
                {plan.originalPrice}/month
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1">
                🔥 Save 50%
              </Badge>
            </div>
          )}
        </div>
        <p className="text-gray-700 mt-3 text-sm leading-relaxed font-medium px-2">
          {plan.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 px-6 pb-6 flex flex-col h-full">
        <Button 
          onClick={() => onPlanSelect(plan)}
          size="lg"
          disabled={loading || plan.name === currentPlanName}
          className={`w-full py-4 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-bold min-h-[52px] touch-manipulation ${
            plan.name === currentPlanName
              ? 'bg-green-100 text-green-800 cursor-not-allowed hover:bg-green-100 border-2 border-green-300'
              : plan.popular 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0'
              : plan.name === 'Free'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0'
              : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0'
          }`}
        >
          <span className="truncate">{getButtonText()}</span>
          {plan.name !== 'Free' && plan.name !== currentPlanName && (
            <Zap className="w-5 h-5 ml-2 flex-shrink-0" />
          )}
        </Button>
        
        <div className="space-y-4 flex-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
            <h4 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>What's included:</span>
            </h4>
            <div className="space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {plan.limitations.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-bold text-gray-600 text-base mb-3 flex items-center gap-2">
              <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span>Not included:</span>
            </h4>
            <div className="space-y-2">
              {plan.limitations.map((limitation, limitIndex) => (
                <div key={limitIndex} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-relaxed">
                    {limitation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
