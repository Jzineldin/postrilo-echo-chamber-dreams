
import { Tabs } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { SimplifiedNavigation } from "@/components/SimplifiedNavigation";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileResponsiveContainer } from "@/components/mobile/MobileResponsiveContainer";

interface AppLayoutProps {
  activeTab: string;
  user: any;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AppLayout = ({ 
  activeTab, 
  user, 
  onTabChange, 
  onLogout, 
  children 
}: AppLayoutProps) => {
  const isMobile = useIsMobile();

  const handleNavigateHome = () => {
    onTabChange("dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 mobile-no-scroll">
      <MobileResponsiveContainer variant="full" padding="none">
        {/* Simplified Header with integrated navigation */}
        <div className={`safe-area-top-padding ${isMobile ? 'px-2 py-2' : 'px-4 py-3'}`}>
          {!isMobile && (
            <SimplifiedNavigation 
              activeTab={activeTab}
              onTabChange={onTabChange}
              onLogout={onLogout}
              user={user}
              isPro={false} // TODO: Connect to subscription status
            />
          )}
          
          {isMobile && (
            <Header onNavigateHome={handleNavigateHome} />
          )}
        </div>

        {/* Mobile Navigation for authenticated users */}
        {user && isMobile && (
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <MobileNavigation 
              activeTab={activeTab}
              onTabChange={onTabChange}
              onCreateProject={() => onTabChange("create")}
              unreadNotifications={0}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className={`${isMobile ? 'pb-20' : 'pb-8'}`}>
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <div className={isMobile ? 'px-1' : 'px-4'}>
              {children}
            </div>
          </Tabs>
        </div>
      </MobileResponsiveContainer>
    </div>
  );
};
