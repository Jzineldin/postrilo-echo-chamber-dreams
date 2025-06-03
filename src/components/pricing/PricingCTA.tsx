
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, CheckCircle } from "lucide-react";

interface PricingCTAProps {
  user: any;
  onPlanSelect: () => void;
  onCreatorPlanSelect: () => void;
}

export const PricingCTA = ({ user, onPlanSelect, onCreatorPlanSelect }: PricingCTAProps) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 mx-2 sm:mx-4 lg:mx-0 shadow-2xl border-2 border-gray-200">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 text-center text-white space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Enhanced heading */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight px-2">
            Ready to transform your social media?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto px-4">
            Join thousands of creators who have already made the switch to AI-powered content creation
          </p>
        </div>

        {/* Enhanced features list */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 max-w-3xl mx-auto my-4 sm:my-6 lg:my-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Setup in 2 minutes</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">No credit card required</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Cancel anytime</span>
          </div>
        </div>

        {/* Enhanced CTA button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
          <Button 
            onClick={() => user ? onCreatorPlanSelect() : onPlanSelect()}
            size="lg"
            className="bg-white text-purple-700 hover:bg-gray-100 text-base sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 min-h-[52px] sm:min-h-[56px] lg:min-h-[64px] w-full sm:w-auto touch-manipulation"
          >
            <span className="truncate">
              {user ? "Upgrade to Creator Plan" : "Start Free Today"}
            </span>
            <div className="flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </Button>
        </div>

        {/* Enhanced trust indicators */}
        <div className="pt-3 sm:pt-4 lg:pt-6">
          <p className="text-sm sm:text-base lg:text-lg text-purple-200 leading-relaxed px-4">
            Start with our <strong className="text-white">free plan</strong> • Upgrade anytime as you grow
          </p>
        </div>
      </div>
    </div>
  );
};
