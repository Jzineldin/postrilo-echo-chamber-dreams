
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingCTAProps {
  onGetStarted: () => void;
  user: any;
}

export const FloatingCTA = ({ onGetStarted, user }: FloatingCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show after scrolling 50% of viewport height and not dismissed
      setIsVisible(scrollPosition > windowHeight * 0.5 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 shadow-2xl border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1">
              Ready to transform your content?
            </p>
            <p className="text-purple-100 text-xs">
              Join 10,000+ creators • Free to start
            </p>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <Button
              onClick={onGetStarted}
              size="sm"
              className="bg-white text-purple-700 hover:bg-gray-100 font-bold px-4 py-2 text-xs"
            >
              {user ? "Dashboard" : "Start Free"}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-purple-200 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
