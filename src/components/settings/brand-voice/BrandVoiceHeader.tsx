
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lightbulb } from "lucide-react";

export const BrandVoiceHeader = () => {
  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>What is Brand Voice?</strong> Your brand voice defines how your AI-generated content sounds and feels. 
          It ensures all your social media posts maintain a consistent personality that matches your brand identity. 
          This helps your audience recognize your content and builds trust and recognition.
        </AlertDescription>
      </Alert>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How Brand Voice Works:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Company Info:</strong> Tells AI about your business context</li>
              <li>• <strong>Personality Sliders:</strong> Sets the tone (formal vs casual, serious vs humorous)</li>
              <li>• <strong>Content Guidelines:</strong> Words to avoid and preferred hashtags</li>
              <li>• <strong>Result:</strong> All generated content matches your unique brand style</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
