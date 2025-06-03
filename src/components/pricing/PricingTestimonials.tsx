
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const PricingTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "@sarahcreates",
      content: "This tool has transformed my social media strategy! I've saved 10+ hours per week and my engagement has increased by 300%.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "TechStartup Inc.",
      content: "The Business plan's analytics features helped us identify our best-performing content. ROI increased by 150% in just 2 months.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Rodriguez",
      role: "Small Business Owner",
      company: "Emma's Boutique",
      content: "As a busy entrepreneur, the Creator plan gives me everything I need to maintain a strong social presence without the hassle.",
      rating: 5,
      avatar: "ER"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-100 mx-2 sm:mx-4 lg:mx-0">
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
          What our customers say
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Join thousands of satisfied creators and businesses
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border border-white/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 mb-4 sm:mb-5 lg:mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-600 truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile-friendly trust indicator */}
      <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 px-3 py-2 sm:px-4 sm:py-3 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Trusted by 10,000+ content creators worldwide
          </span>
        </div>
      </div>
    </div>
  );
};
