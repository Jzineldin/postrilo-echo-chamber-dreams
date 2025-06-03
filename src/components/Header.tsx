
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header = ({ onNavigateHome }: HeaderProps) => {
  const isMobile = useIsMobile();

  const handleLogoClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <div className="text-center mb-6 md:mb-8 safe-area-padding">
      <h1 className={`font-display font-bold text-gray-900 mb-4 flex items-center justify-center gap-2 md:gap-3 ${
        isMobile ? 'text-3xl flex-col sm:flex-row' : 'text-4xl lg:text-6xl'
      }`}>
        <div 
          className={`flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
            isMobile ? 'w-16 h-16 mb-2 sm:mb-0' : 'w-20 h-20 lg:w-24 lg:h-24'
          }`}
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleLogoClick();
            }
          }}
          aria-label="Navigate to home page"
        >
          <img 
            src="/lovable-uploads/dbfdbbd7-d962-4864-ab5c-0e066d45c0a2.png" 
            alt="Postrilo Logo" 
            className={`object-contain ${
              isMobile ? 'w-16 h-16' : 'w-20 h-20 lg:w-24 lg:h-24'
            }`}
          />
        </div>
        <span 
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleLogoClick();
            }
          }}
          aria-label="Navigate to home page"
        >
          Postrilo
        </span>
      </h1>
      <p className={`text-gray-600 max-w-2xl mx-auto font-body leading-relaxed mobile-text px-4 ${
        isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
      }`}>
        Generate social media content tailored to your brand voice – fast, smart, effortless
      </p>
    </div>
  );
};
