
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useAppNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

  console.log("App navigation state:", { activeTab, user: !!user, loading });

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      console.log("Hash changed to:", hash);
      
      if (hash) {
        const validTabs = ['dashboard', 'create', 'analytics', 'brand-voice', 'scheduler', 'settings', 'pricing', 'help', 'auth', 'home'];
        if (validTabs.includes(hash)) {
          setActiveTab(hash);
        }
      } else {
        // If no hash, default to home for unauthenticated users or dashboard for authenticated
        setActiveTab(user ? "dashboard" : "home");
      }
    };

    handleHashChange(); // Check initial hash
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const handleAuth = () => {
    console.log("Auth handler called - navigating to auth page");
    setActiveTab("auth");
    window.location.hash = 'auth';
  };

  const handleAuthSuccess = () => {
    console.log("Auth success - navigating to dashboard");
    setActiveTab("dashboard");
    window.location.hash = 'dashboard';
    // Force a full page refresh to ensure clean state
    setTimeout(() => {
      window.location.href = '/#dashboard';
    }, 100);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out user");
      await signOut();
      setActiveTab("home");
      window.location.hash = '';
      // Force page refresh after logout
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTabChange = (newTab: string) => {
    console.log("Tab change requested:", { from: activeTab, to: newTab });
    
    // Check if user needs to be authenticated for protected tabs
    const protectedTabs = ["dashboard", "create", "analytics", "brand-voice", "scheduler", "settings"];
    
    if (protectedTabs.includes(newTab) && !user) {
      console.log("Protected tab requested without auth, redirecting to auth");
      setActiveTab("auth");
      window.location.hash = 'auth';
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
      });
      return;
    }
    
    console.log("Changing tab to:", newTab);
    setActiveTab(newTab);
    window.location.hash = newTab === "home" ? '' : newTab;
  };

  return {
    activeTab,
    user,
    loading,
    handleAuth,
    handleAuthSuccess,
    handleLogout,
    handleTabChange
  };
};
