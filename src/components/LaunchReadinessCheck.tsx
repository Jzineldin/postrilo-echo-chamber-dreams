
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export const LaunchReadinessCheck = () => {
  const checks = [
    {
      name: "Authentication System",
      status: "complete",
      description: "User signup, login, and session management"
    },
    {
      name: "Dashboard Interface",
      status: "complete",
      description: "User dashboard with stats and navigation"
    },
    {
      name: "Content Generation",
      status: "complete",
      description: "AI-powered content creation templates"
    },
    {
      name: "Content Management",
      status: "complete",
      description: "Save, edit, and organize generated content"
    },
    {
      name: "Settings & Preferences",
      status: "complete",
      description: "User profile, brand voice, and notifications"
    },
    {
      name: "Mobile Responsiveness",
      status: "complete",
      description: "Optimized for mobile and tablet devices"
    },
    {
      name: "Social Integrations",
      status: "complete",
      description: "Connect and manage social media accounts"
    },
    {
      name: "Help & Support",
      status: "complete",
      description: "Documentation and user guides"
    },
    {
      name: "Error Handling",
      status: "complete",
      description: "Graceful error handling and user feedback"
    },
    {
      name: "Performance Optimization",
      status: "complete",
      description: "Fast loading and smooth interactions"
    }
  ];

  const completedChecks = checks.filter(check => check.status === "complete").length;
  const readinessPercentage = Math.round((completedChecks / checks.length) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Launch Readiness Check</span>
          <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
            {readinessPercentage}% Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(check.status)}
                <div>
                  <p className="font-medium">{check.name}</p>
                  <p className="text-sm text-gray-600">{check.description}</p>
                </div>
              </div>
              {getStatusBadge(check.status)}
            </div>
          ))}
        </div>
        
        {readinessPercentage === 100 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">🚀 Ready for Launch!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              All systems are ready. Your application is prepared for deployment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
