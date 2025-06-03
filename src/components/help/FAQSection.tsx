
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { DollarSign, User, Lightbulb, Settings } from "lucide-react";

export const FAQSection = () => {
  const faqCategories = [
    {
      id: "pricing",
      title: "Pricing Questions",
      icon: DollarSign,
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes 1,000 AI-generated words per month, 3 brand voices, basic templates, and access to our content generator. Perfect for getting started!"
        },
        {
          question: "Can I upgrade or downgrade my plan anytime?",
          answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
        },
        {
          question: "Are there any setup fees or hidden costs?",
          answer: "No, there are no setup fees or hidden costs. The price you see is exactly what you'll pay."
        }
      ]
    },
    {
      id: "account",
      title: "Account Management",
      icon: User,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page, enter your email, and we'll send you a reset link within minutes."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, go to Settings > Account and update your email address. You'll need to verify the new email before the change takes effect."
        },
        {
          question: "How do I delete my account?",
          answer: "Contact our support team to request account deletion. We'll remove all your data within 30 days as per our privacy policy."
        },
        {
          question: "Can I transfer my content to another account?",
          answer: "Account transfers aren't automated, but our support team can help migrate your content. Please contact us with your requirements."
        }
      ]
    },
    {
      id: "content",
      title: "Content Generation Tips",
      icon: Lightbulb,
      questions: [
        {
          question: "How can I improve the quality of generated content?",
          answer: "Provide detailed prompts, set up your brand voice properly, and use specific keywords. The more context you give, the better the output."
        },
        {
          question: "What makes a good brand voice?",
          answer: "A good brand voice includes your tone (professional, casual, friendly), personality traits, target audience, and key messages you want to convey."
        },
        {
          question: "Can I edit the generated content?",
          answer: "Absolutely! All generated content can be edited and customized. We encourage you to review and adjust content to match your needs."
        },
        {
          question: "How many revisions can I make?",
          answer: "You can regenerate content as many times as needed within your plan's word limit. Each generation counts toward your monthly allowance."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Troubleshooting",
      icon: Settings,
      questions: [
        {
          question: "Why isn't my content generating?",
          answer: "Check your internet connection, ensure you haven't exceeded your monthly word limit, and try refreshing the page. Contact support if the issue persists."
        },
        {
          question: "My scheduled posts aren't publishing. What should I do?",
          answer: "Verify your social media accounts are properly connected and authorized. Check if the platforms have any API issues or if your content meets their guidelines."
        },
        {
          question: "How do I connect my social media accounts?",
          answer: "Go to Settings > Integrations and click 'Connect' next to each platform. You'll be redirected to authorize the connection securely."
        },
        {
          question: "What browsers do you support?",
          answer: "We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, keep your browser updated to the latest version."
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {faqCategories.map((category) => {
        const Icon = category.icon;
        return (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {category.title}
                <Badge variant="outline">{category.questions.length} questions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${category.id}-${index}`}>
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
        );
      })}
    </div>
  );
};
