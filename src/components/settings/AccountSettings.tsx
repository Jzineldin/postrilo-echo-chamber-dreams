
import { useState } from 'react';
import { ProfileSection } from './ProfileSection';
import { PasswordSection } from './PasswordSection';
import { SocialAccountsSection } from './SocialAccountsSection';
import { NotificationSection } from './NotificationSection';
import { useIsMobile } from '@/hooks/use-mobile';

export const AccountSettings = () => {
  const isMobile = useIsMobile();
  
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    password: false,
    social: false,
    notifications: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        <ProfileSection
          isExpanded={expandedSections.profile}
          onToggle={() => toggleSection('profile')}
        />
        <PasswordSection
          isExpanded={expandedSections.password}
          onToggle={() => toggleSection('password')}
        />
        <SocialAccountsSection
          isExpanded={expandedSections.social}
          onToggle={() => toggleSection('social')}
        />
        <NotificationSection
          isExpanded={expandedSections.notifications}
          onToggle={() => toggleSection('notifications')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileSection />
      <PasswordSection />
      <SocialAccountsSection />
      <NotificationSection />
    </div>
  );
};
