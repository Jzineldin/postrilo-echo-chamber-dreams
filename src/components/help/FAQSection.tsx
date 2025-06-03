
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI content generation work?",
      answer: "Our AI uses advanced language models to create content based on your input. Simply provide a topic, select your platform and tone, and our AI will generate engaging, platform-optimized content for you."
    },
    {
      question: "Can I edit the generated content?",
      answer: "Absolutely! All generated content can be edited before posting. You can modify text, add your own touches, or use it as inspiration for your own content."
    },
    {
      question: "Which social media platforms are supported?",
      answer: "We support all major platforms including Instagram, Twitter, Facebook, LinkedIn, TikTok, and YouTube. Each platform has specific optimizations for character limits and best practices."
    },
    {
      question: "How many posts can I generate per month?",
      answer: "This depends on your subscription plan. Free users get 5 posts per month, while Pro users get unlimited generation. Check our pricing page for detailed limits."
    },
    {
      question: "Can I schedule posts to multiple platforms?",
      answer: "Yes! Our scheduler allows you to plan and schedule content across multiple platforms simultaneously, saving you time and ensuring consistent posting."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, Postrilo is a web-based platform optimized for mobile browsers. A dedicated mobile app is in development and coming soon."
    },
    {
      question: "How do I set up my brand voice?",
      answer: "Go to the Brand Voice section in your dashboard. You can define your brand's tone, target audience, key messages, and writing style. This helps the AI generate content that matches your brand perfectly."
    },
    {
      question: "Can I export my content?",
      answer: "Yes, you can export your generated content in various formats including CSV, JSON, or individual text files for backup or use in other tools."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-600">Find answers to common questions about Postrilo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
