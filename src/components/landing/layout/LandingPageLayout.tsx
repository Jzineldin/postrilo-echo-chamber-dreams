
import React from "react";
import { MobileResponsiveContainer, MobileStack } from "@/components/mobile/MobileResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LandingPageLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  showFooter?: boolean;
}

export const LandingPageLayout = ({ 
  children, 
  fullWidth = false,
  showFooter = true 
}: LandingPageLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <MobileResponsiveContainer 
      variant={fullWidth ? "full" : "default"}
      padding={isMobile ? "sm" : "default"}
    >
      <MobileStack spacing={isMobile ? "sm" : "default"}>
        {children}
        {showFooter && (
          <footer className="py-8 text-center text-gray-600">
            <p>&copy; 2024 Postrilo. All rights reserved.</p>
          </footer>
        )}
      </MobileStack>
    </MobileResponsiveContainer>
  );
};
