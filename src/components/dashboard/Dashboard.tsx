
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOnboarding } from '@/hooks/useOnboarding';
import { DashboardHeader } from './DashboardHeader';
import { DashboardCards } from './DashboardCards';
import { RecentContent } from './RecentContent';
import { OnboardingTour } from '../onboarding/OnboardingTour';
import { OnboardingModal } from '../onboarding/OnboardingModal';

interface DashboardProps {
  onTabChange?: (tab: string) => void;
}

export const Dashboard = ({ onTabChange }: DashboardProps) => {
  const isMobile = useIsMobile();
  const { 
    hasCompletedOnboarding, 
    showOnboarding, 
    completeOnboarding, 
    skipOnboarding 
  } = useOnboarding();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <DashboardHeader onTabChange={onTabChange} />
        
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
          <div className={isMobile ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
            <DashboardCards isMobile={isMobile} onTabChange={onTabChange} />
          </div>
          
          <div className="space-y-6">
            <RecentContent isMobile={isMobile} onTabChange={onTabChange} />
          </div>
        </div>

        {/* Onboarding Systems */}
        <OnboardingModal
          isVisible={!hasCompletedOnboarding && !showOnboarding}
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
        
        <OnboardingTour
          isVisible={showOnboarding}
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
      </div>
    </div>
  );
};
