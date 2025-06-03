
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ContentTipProps {
  isMobile: boolean;
}

export const ContentTip = ({ isMobile }: ContentTipProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tips = [
    "Start your posts with a hook question to grab attention immediately",
    "Use the 80/20 rule: 80% value, 20% promotion for better engagement",
    "Post consistently at your audience's peak activity times",
    "Include a clear call-to-action in every post to drive engagement",
    "Use storytelling to make your content more relatable and memorable",
    "Add emojis strategically to break up text and increase readability",
    "Test different content formats to see what resonates with your audience"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const goToTip = (index: number) => {
    if (index !== currentTip) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTip(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const nextTip = () => {
    goToTip((currentTip + 1) % tips.length);
  };

  const prevTip = () => {
    goToTip((currentTip - 1 + tips.length) % tips.length);
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20">
      <CardHeader className={isMobile ? "pb-3" : ""}>
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
          <Lightbulb className="w-5 h-5" />
          Content Creation Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTip}
              className="h-8 w-8 p-0 hover:bg-purple-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex-1">
              <p className={`text-sm text-gray-700 leading-relaxed transition-opacity duration-300 ${
                isAnimating ? 'opacity-50' : 'opacity-100'
              }`}>
                💡 {tips[currentTip]}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTip}
              className="h-8 w-8 p-0 hover:bg-purple-100"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTip(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentTip ? 'bg-purple-600' : 'bg-gray-300 hover:bg-purple-400'
                  }`}
                  aria-label={`Go to tip ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
