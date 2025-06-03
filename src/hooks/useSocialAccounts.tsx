
import { useState, useEffect } from 'react';

export interface SocialAccount {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  isConnected: boolean;
  username?: string;
  lastSync?: string;
}

export const useSocialAccounts = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);

  useEffect(() => {
    // Load saved connections from localStorage
    const savedConnections = localStorage.getItem('social-accounts');
    if (savedConnections) {
      try {
        const parsed = JSON.parse(savedConnections);
        setAccounts(parsed);
      } catch (error) {
        console.error('Error loading social accounts:', error);
        initializeAccounts();
      }
    } else {
      initializeAccounts();
    }
  }, []);

  const initializeAccounts = () => {
    const defaultAccounts: SocialAccount[] = [
      {
        id: 'twitter',
        name: 'Twitter/X',
        icon: () => <span className="text-blue-500 font-bold text-lg">𝕏</span>,
        color: 'text-blue-500',
        isConnected: false
      },
      {
        id: 'instagram',
        name: 'Instagram',
        icon: () => <span className="text-pink-500 font-bold text-lg">📷</span>,
        color: 'text-pink-500',
        isConnected: false
      },
      {
        id: 'facebook',
        name: 'Facebook',
        icon: () => <span className="text-blue-600 font-bold text-lg">f</span>,
        color: 'text-blue-600',
        isConnected: false
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: () => <span className="text-blue-700 font-bold text-sm">in</span>,
        color: 'text-blue-700',
        isConnected: false
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        icon: () => <span className="text-black font-bold text-lg">🎵</span>,
        color: 'text-black',
        isConnected: false
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        icon: () => <span className="text-red-600 font-bold text-lg">P</span>,
        color: 'text-red-600',
        isConnected: false
      }
    ];
    setAccounts(defaultAccounts);
  };

  const connectAccount = (accountId: string, username: string) => {
    const updated = accounts.map(account => 
      account.id === accountId 
        ? { 
            ...account, 
            isConnected: true, 
            username,
            lastSync: new Date().toISOString()
          }
        : account
    );
    setAccounts(updated);
    localStorage.setItem('social-accounts', JSON.stringify(updated));
  };

  const disconnectAccount = (accountId: string) => {
    const updated = accounts.map(account => 
      account.id === accountId 
        ? { 
            ...account, 
            isConnected: false, 
            username: undefined,
            lastSync: undefined
          }
        : account
    );
    setAccounts(updated);
    localStorage.setItem('social-accounts', JSON.stringify(updated));
  };

  const getConnectedAccounts = () => {
    return accounts.filter(account => account.isConnected);
  };

  return {
    accounts,
    connectAccount,
    disconnectAccount,
    getConnectedAccounts
  };
};
