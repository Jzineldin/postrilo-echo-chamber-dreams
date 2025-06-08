
import React from 'react';
import { UniversalHeader } from './navigation/UniversalHeader';
import { SettingsHub } from './settings/SettingsHub';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const SettingsPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalHeader 
        title="Settings"
        currentPage="Manage your account and preferences"
        onBack={handleBack}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SettingsHub user={user} />
      </div>
    </div>
  );
};
