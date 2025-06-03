
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";

export const GettingStartedGuide = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Sign up and verify your email to get started with our platform.",
      completed: true
    },
    {
      id: 2,
      title: "Set Up Your Brand Voice",
      description: "Define your brand's tone, style, and personality to ensure consistent content.",
      completed: false
    },
    {
      id: 3,
      title: "Generate Your First Content",
      description: "Use our AI tools to create engaging social media posts for your audience.",
      completed: false
    },
    {
      id: 4,
      title: "Schedule and Publish",
      description: "Plan your content calendar and schedule posts across multiple platforms.",
      completed: false
    }
  ];

  const tips = [
    "Start with a clear content strategy and goals",
    "Use high-quality visuals to increase engagement",
    "Post consistently to build audience loyalty",
    "Engage with your audience through comments and messages",
    "Analyze your performance and adjust your strategy"
  ];

  return (
    <div className="space-y-6">
      {/* Video Walkthrough */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Video Walkthrough
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Play className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Complete Platform Tour</h3>
            <p className="text-gray-600 mb-4">
              Watch our 10-minute walkthrough to see all the main features in action
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Play className="w-4 h-4 mr-2" />
              Watch Video
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-step Tutorial */}
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Tutorial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium">
                      {step.id}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{step.title}</h4>
                    {step.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Tips for Effective Social Media Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
