
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export const PricingHeader = () => {
  return (
    <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-6">
      {/* Enhanced badge with better mobile sizing */}
      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border-2 border-purple-200 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
        <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 leading-tight">
          Free Plan Available • Start Creating Today
        </span>
      </div>
      
      {/* Improved heading with better mobile scaling */}
      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight px-2">
          Choose your perfect plan
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
          Join thousands of creators and businesses who have transformed their social media presence. Start free and upgrade when you're ready.
        </p>
      </div>
      
      {/* Enhanced money-back guarantee with better mobile design */}
      <div className="inline-flex items-start sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm sm:max-w-md mx-auto">
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="text-left min-w-0 flex-1">
          <div className="text-sm sm:text-base font-bold text-green-800 leading-tight">
            30-Day Money-Back Guarantee
          </div>
          <div className="text-xs sm:text-sm text-green-600 leading-snug mt-0.5">
            Risk-free trial • Full refund if not satisfied
          </div>
        </div>
      </div>
    </div>
  );
};
