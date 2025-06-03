
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Info, Zap, Star, Crown } from "lucide-react";

interface ComparisonFeature {
  name: string;
  description: string;
  free: boolean | string;
  creator: boolean | string;
  business: boolean | string;
  category: string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Posts per month",
    description: "Number of AI-generated posts you can create",
    free: "5",
    creator: "50",
    business: "Unlimited",
    category: "Content Generation"
  },
  {
    name: "Social platforms",
    description: "Supported social media platforms",
    free: "Twitter, Facebook",
    creator: "All platforms",
    business: "All + specialized content",
    category: "Platforms"
  },
  {
    name: "Content templates",
    description: "Pre-built templates for different content types",
    free: "Basic templates",
    creator: "Advanced templates",
    business: "Custom templates",
    category: "Templates"
  },
  {
    name: "Hashtag research",
    description: "AI-powered hashtag suggestions",
    free: false,
    creator: true,
    business: true,
    category: "AI Features"
  },
  {
    name: "Brand voice training",
    description: "Customize AI to match your brand tone",
    free: "Limited",
    creator: "Advanced",
    business: "Full customization",
    category: "AI Features"
  },
  {
    name: "Content calendar",
    description: "Plan and schedule your content",
    free: false,
    creator: true,
    business: true,
    category: "Scheduling"
  },
  {
    name: "Analytics & insights",
    description: "Performance tracking and recommendations",
    free: false,
    creator: false,
    business: true,
    category: "Analytics"
  },
  {
    name: "Team collaboration",
    description: "Multi-user access and approval workflows",
    free: false,
    creator: false,
    business: true,
    category: "Collaboration"
  },
  {
    name: "Priority support",
    description: "Faster response times and dedicated support",
    free: "Community",
    creator: "Email support",
    business: "Priority support",
    category: "Support"
  }
];

const categories = ["All", "Content Generation", "AI Features", "Platforms", "Templates", "Scheduling", "Analytics", "Collaboration", "Support"];

export const PricingInteractiveComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [highlightedPlan, setHighlightedPlan] = useState<string | null>(null);

  const filteredFeatures = selectedCategory === "All" 
    ? comparisonFeatures 
    : comparisonFeatures.filter(feature => feature.category === selectedCategory);

  const renderFeatureValue = (value: boolean | string, planName: string) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      );
    }
    return (
      <span className={`text-sm font-medium ${
        planName === highlightedPlan ? 'text-purple-700' : 'text-gray-700'
      }`}>
        {value}
      </span>
    );
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'Free': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'Creator': return <Star className="w-4 h-4 text-purple-600" />;
      case 'Business': return <Crown className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 mx-4 lg:mx-0">
      <div className="text-center mb-8">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Compare All Features
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See exactly what's included in each plan and find the perfect fit for your needs
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`text-xs sm:text-sm ${
                selectedCategory === category 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'hover:bg-purple-50 hover:border-purple-200'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-2 sm:px-4 w-1/3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">Features</span>
                </div>
              </th>
              {['Free', 'Creator', 'Business'].map((plan) => (
                <th 
                  key={plan}
                  className={`text-center py-4 px-2 sm:px-4 transition-all duration-200 ${
                    highlightedPlan === plan ? 'bg-purple-50 rounded-t-lg' : ''
                  }`}
                  onMouseEnter={() => setHighlightedPlan(plan)}
                  onMouseLeave={() => setHighlightedPlan(null)}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {getPlanIcon(plan)}
                    <span className="font-semibold text-gray-900">{plan}</span>
                  </div>
                  {plan === 'Creator' && (
                    <Badge className="bg-purple-100 text-purple-700 text-xs">
                      Most Popular
                    </Badge>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="py-4 px-2 sm:px-4">
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      {feature.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">
                      {feature.description}
                    </div>
                  </div>
                </td>
                <td className={`py-4 px-2 sm:px-4 text-center transition-all duration-200 ${
                  highlightedPlan === 'Free' ? 'bg-purple-50' : ''
                }`}>
                  {renderFeatureValue(feature.free, 'Free')}
                </td>
                <td className={`py-4 px-2 sm:px-4 text-center transition-all duration-200 ${
                  highlightedPlan === 'Creator' ? 'bg-purple-50' : ''
                }`}>
                  {renderFeatureValue(feature.creator, 'Creator')}
                </td>
                <td className={`py-4 px-2 sm:px-4 text-center transition-all duration-200 ${
                  highlightedPlan === 'Business' ? 'bg-purple-50' : ''
                }`}>
                  {renderFeatureValue(feature.business, 'Business')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Call to Action */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Ready to get started? Choose the plan that's right for you.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold">
            Compare Plans Above
          </Button>
        </div>
      </div>
    </div>
  );
};
