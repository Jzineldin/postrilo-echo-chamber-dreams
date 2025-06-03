
import { CheckCircle, X } from "lucide-react";

export const PricingComparison = () => {
  const features = [
    {
      feature: "Generated posts per month",
      free: "5 posts",
      creator: "50 posts",
      business: "Unlimited"
    },
    {
      feature: "Social platforms",
      free: "Twitter, Facebook",
      creator: "All platforms",
      business: "All platforms + specialized"
    },
    {
      feature: "Content templates",
      free: "Basic templates",
      creator: "Advanced templates",
      business: "Custom templates"
    },
    {
      feature: "Hashtag research",
      free: false,
      creator: true,
      business: true
    },
    {
      feature: "Brand voice training",
      free: false,
      creator: "Basic",
      business: "Advanced"
    },
    {
      feature: "Analytics & insights",
      free: false,
      creator: false,
      business: true
    },
    {
      feature: "Team collaboration",
      free: false,
      creator: false,
      business: true
    },
    {
      feature: "Priority support",
      free: false,
      creator: false,
      business: true
    },
    {
      feature: "Content calendar",
      free: false,
      creator: true,
      business: true
    },
    {
      feature: "Custom scheduling",
      free: false,
      creator: false,
      business: true
    }
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto" />
      );
    }
    return (
      <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">
        {value}
      </span>
    );
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-lg mx-2 sm:mx-4 lg:mx-0">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          Compare Plans
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Choose the perfect plan for your content creation needs
        </p>
      </div>

      {/* Mobile-first responsive table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
            <div className="p-2 sm:p-3">
              <span className="text-xs sm:text-sm font-bold text-gray-900">Features</span>
            </div>
            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg text-center">
              <span className="text-xs sm:text-sm font-bold text-blue-700">Free</span>
            </div>
            <div className="p-2 sm:p-3 bg-purple-50 rounded-lg text-center">
              <span className="text-xs sm:text-sm font-bold text-purple-700">Creator</span>
            </div>
            <div className="p-2 sm:p-3 bg-orange-50 rounded-lg text-center">
              <span className="text-xs sm:text-sm font-bold text-orange-700">Business</span>
            </div>
          </div>

          {/* Feature rows */}
          <div className="space-y-1 sm:space-y-2">
            {features.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-1 sm:gap-2 py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
                <div className="p-2 sm:p-3 flex items-center">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">
                    {item.feature}
                  </span>
                </div>
                <div className="p-2 sm:p-3 flex items-center justify-center">
                  {renderFeatureValue(item.free)}
                </div>
                <div className="p-2 sm:p-3 flex items-center justify-center">
                  {renderFeatureValue(item.creator)}
                </div>
                <div className="p-2 sm:p-3 flex items-center justify-center">
                  {renderFeatureValue(item.business)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-friendly note */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
        <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
          All plans include a 7-day free trial • Cancel anytime • 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};
