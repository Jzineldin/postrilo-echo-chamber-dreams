
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Briefcase, Heart, Zap, Target } from "lucide-react";

export const IndustryUseCases = () => {
  const useCases = [
    {
      icon: TrendingUp,
      title: "E-commerce Brands",
      description: "Product launches, customer testimonials, and seasonal campaigns",
      results: "3x more product visibility",
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      icon: Users,
      title: "SaaS Companies",
      description: "Feature announcements, customer success stories, and thought leadership",
      results: "40% more qualified leads",
      color: "bg-purple-50 border-purple-200 text-purple-700"
    },
    {
      icon: Briefcase,
      title: "Consultants & Coaches",
      description: "Personal branding, client testimonials, and expertise showcases",
      results: "5x more consultation bookings",
      color: "bg-green-50 border-green-200 text-green-700"
    },
    {
      icon: Heart,
      title: "Healthcare & Wellness",
      description: "Educational content, patient stories, and wellness tips",
      results: "60% better patient engagement",
      color: "bg-pink-50 border-pink-200 text-pink-700"
    },
    {
      icon: Zap,
      title: "Tech Startups",
      description: "Product demos, team updates, and industry insights",
      results: "2x faster user acquisition",
      color: "bg-orange-50 border-orange-200 text-orange-700"
    },
    {
      icon: Target,
      title: "Marketing Agencies",
      description: "Multi-client content creation and campaign management",
      results: "10x faster content delivery",
      color: "bg-indigo-50 border-indigo-200 text-indigo-700"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            Industry Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by leaders across industries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how different industries use Postrilo to scale their content and grow their audience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card key={index} className={`border-2 hover:shadow-lg transition-all duration-300 ${useCase.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{useCase.title}</h3>
                      <p className="text-sm opacity-80">{useCase.description}</p>
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-sm font-semibold">
                      📈 {useCase.results}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
