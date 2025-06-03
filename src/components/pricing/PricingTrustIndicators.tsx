
import { Users, TrendingUp, Sparkles } from "lucide-react";

export const PricingTrustIndicators = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/20 shadow-lg mx-4 sm:mx-6 lg:mx-0">
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Trusted by creators worldwide
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          Join thousands who have transformed their social media presence
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 text-center">
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">10,000+ Active Users</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Trusted by creators and businesses worldwide</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">300% Avg. Engagement Increase</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Our users see dramatic improvements in their social metrics</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">500,000+ Posts Generated</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Millions of high-quality posts created and published</p>
        </div>
      </div>
    </div>
  );
};
