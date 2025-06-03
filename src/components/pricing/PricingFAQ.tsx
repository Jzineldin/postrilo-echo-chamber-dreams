
export const PricingFAQ = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-gray-200 shadow-lg mx-4 sm:mx-6 lg:mx-0">
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-base sm:text-lg text-gray-600">
          Everything you need to know about our pricing and plans
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-50/80 rounded-xl">
          <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900">How does the free trial work?</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Start with a 7-day free trial of any paid plan. No credit card required. Cancel anytime during the trial period.</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-50/80 rounded-xl">
          <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900">Can I change plans anytime?</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Yes! Upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately with prorated billing.</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-50/80 rounded-xl">
          <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900">What's included in the money-back guarantee?</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">If you're not satisfied within 30 days of your first paid subscription, we'll refund your money completely. No questions asked.</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-50/80 rounded-xl">
          <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900">Do unused posts roll over?</h4>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Posts reset monthly on your billing date. Business plan users get unlimited posts, so no worries about limits!</p>
        </div>
      </div>
    </div>
  );
};
