
import React from 'react';
import { VideoTestimonial } from '@/components/social-proof/VideoTestimonial';
import { LiveActivityFeed } from '@/components/social-proof/LiveActivityFeed';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Marketing Director",
      company: "TechFlow Inc",
      videoUrl: "/placeholder-video.mp4",
      thumbnailUrl: "/placeholder.svg",
      quote: "Postrilo transformed our content strategy. We went from posting twice a week to daily content that actually converts.",
      metrics: "300% increase in engagement, 5x faster content creation",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      title: "Social Media Manager",
      company: "Growth Labs",
      videoUrl: "/placeholder-video.mp4",
      thumbnailUrl: "/placeholder.svg",
      quote: "The AI understands our brand voice perfectly. It's like having a content team that never sleeps.",
      metrics: "50% more qualified leads, 10 hours saved per week",
      rating: 5
    }
  ];

  const writtenTestimonials = [
    {
      content: "Game-changer for our startup. We're competing with companies 10x our size now.",
      author: "Alex Kim",
      role: "Founder, StartupBoost",
      rating: 5
    },
    {
      content: "The template variety is incredible. Perfect for different industries and goals.",
      author: "Lisa Thompson",
      role: "Content Creator",
      rating: 5
    },
    {
      content: "ROI was immediate. Paid for itself in the first week through better engagement.",
      author: "David Park",
      role: "Marketing Lead, GrowthCo",
      rating: 5
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            Social Proof & Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join thousands of creators seeing real results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - see what our community is achieving
          </p>
        </div>

        {/* Live Activity Feed */}
        <div className="mb-12 max-w-md mx-auto">
          <LiveActivityFeed />
        </div>

        {/* Video Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <VideoTestimonial key={index} {...testimonial} />
          ))}
        </div>

        {/* Written Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {writtenTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4">
                <Quote className="w-5 h-5 text-purple-400 mb-2" />
                "{testimonial.content}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Trusted by content creators at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Shopify', 'Airbnb', 'Buffer', 'Later', 'Hootsuite', 'Canva'].map((company) => (
              <div key={company} className="text-xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
