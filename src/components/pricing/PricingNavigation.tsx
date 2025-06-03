
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Home, CreditCard, HelpCircle, Users, BarChart3 } from "lucide-react";

interface NavigationSection {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navigationSections: NavigationSection[] = [
  { id: "plans", label: "Plans", icon: CreditCard },
  { id: "comparison", label: "Compare", icon: BarChart3 },
  { id: "testimonials", label: "Reviews", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle }
];

export const PricingNavigation = () => {
  const [activeSection, setActiveSection] = useState("plans");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowBackToTop(scrollTop > 500);

      // Update active section based on scroll position
      const sections = navigationSections.map(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: section.id,
            top: rect.top,
            inView: rect.top <= 100 && rect.bottom >= 100
          };
        }
        return { id: section.id, top: 0, inView: false };
      });

      const currentSection = sections.find(section => section.inView);
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for navigation height
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Home Button */}
            <Button
              variant="ghost"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>

            {/* Navigation Sections */}
            <div className="flex items-center gap-1 sm:gap-2">
              {navigationSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <Button
                    key={section.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      isActive 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{section.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-xs text-gray-500">
                {Math.round(scrollProgress)}%
              </div>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-150 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Pricing</span>
            <span>/</span>
            <span className="capitalize font-medium text-purple-600">
              {navigationSections.find(section => section.id === activeSection)?.label || 'Plans'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
