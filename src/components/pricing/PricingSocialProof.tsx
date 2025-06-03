
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, Users, Award, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content: "Postrilo transformed our social media strategy. We've seen a 300% increase in engagement since switching to AI-generated content.",
    rating: 5,
    avatar: "/placeholder.svg",
    plan: "Business"
  },
  {
    name: "Mike Rodriguez",
    role: "Content Creator",
    company: "Independent",
    content: "As a solo creator, Postrilo saves me 10+ hours per week. The AI perfectly captures my voice and creates content that resonates.",
    rating: 5,
    avatar: "/placeholder.svg",
    plan: "Creator"
  },
  {
    name: "Emily Watson",
    role: "Social Media Manager",
    company: "Fashion Forward",
    content: "The brand voice training is incredible. Our AI-generated posts are indistinguishable from our manually created content.",
    rating: 5,
    avatar: "/placeholder.svg",
    plan: "Creator"
  }
];

const stats = [
  {
    value: "10,000+",
    label: "Active Users",
    icon: Users,
    description: "Content creators trust Postrilo"
  },
  {
    value: "2M+",
    label: "Posts Generated",
    icon: TrendingUp,
    description: "AI-powered content created"
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    icon: Award,
    description: "Customer satisfaction score"
  },
  {
    value: "24/7",
    label: "Content Creation",
    icon: CheckCircle,
    description: "Always available when you need it"
  }
];

const trustBadges = [
  { name: "SOC 2 Compliant", icon: CheckCircle },
  { name: "GDPR Compliant", icon: CheckCircle },
  { name: "99.9% Uptime", icon: TrendingUp },
  { name: "Enterprise Security", icon: Award }
];

export const PricingSocialProof = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Statistics Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white mx-4 lg:mx-0">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Trusted by Thousands of Creators
          </h3>
          <p className="text-purple-100 max-w-2xl mx-auto">
            Join the growing community of content creators who have transformed their social media presence
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <IconComponent className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-xs lg:text-sm text-purple-100">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mx-4 lg:mx-0">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real users have to say about Postrilo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.company}
                    </div>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      testimonial.plan === 'Business' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {testimonial.plan}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-purple-200 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 rounded-xl p-6 lg:p-8 mx-4 lg:mx-0">
        <div className="text-center mb-6">
          <h4 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
            Enterprise-Grade Security & Compliance
          </h4>
          <p className="text-gray-600">
            Your data is safe and secure with industry-leading standards
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                <IconComponent className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
