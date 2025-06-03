
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQSectionProps {
  isMobile: boolean;
}

export const FAQSection = ({ isMobile }: FAQSectionProps) => {
  const faqs = [
    {
      question: "How does the AI understand my brand voice?",
      answer: "Our AI analyzes your existing content, tone preferences, and style guidelines to create a custom brand voice model. The more you use it, the better it gets at matching your unique style."
    },
    {
      question: "Which social platforms do you support?",
      answer: "We support all major platforms including Instagram, Facebook, Twitter/X, LinkedIn, TikTok, and Pinterest. Each post is automatically optimized for the specific platform's best practices and character limits."
    },
    {
      question: "Can I schedule posts in advance?",
      answer: "Yes! Our built-in scheduler lets you plan content weeks or months ahead. You can also set up recurring posts and optimal timing based on your audience's activity patterns."
    },
    {
      question: "Is there a limit on content generation?",
      answer: "Our free plan includes 50 AI-generated posts per month. Paid plans offer unlimited generation, advanced analytics, team collaboration features, and priority support."
    },
    {
      question: "How accurate are the analytics?",
      answer: "We pull real-time data directly from each platform's API to provide accurate engagement metrics, reach data, and performance insights. All data is updated automatically."
    }
  ];

  return (
    <div className="relative">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/60 via-white to-purple-50/30 -z-10" />
      
      <div className="space-y-2 md:space-y-4 safe-area-padding py-3 md:py-5">
        <div className="text-center space-y-1 md:space-y-2 max-w-3xl mx-auto px-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-gray-900 leading-tight">
            Frequently asked questions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-body">
            Everything you need to know about our platform
          </p>
        </div>

        {/* Ultra-compact accordion */}
        <div className="max-w-3xl mx-auto px-1">
          <Accordion type="single" collapsible className="space-y-1 md:space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-lg px-3 md:px-4 shadow-sm"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-gray-900 text-sm sm:text-base leading-tight py-2.5 md:py-3 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed font-body text-xs sm:text-sm pb-2.5 md:pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
