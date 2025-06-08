
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useAppNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("App navigation state:", { activeTab, user: !!user, loading });

  // Handle route-based navigation instead of hash-based
  useEffect(() => {
    const pathname = location.pathname;
    console.log("Route changed to:", pathname);
    
    // Map routes to tabs
    const routeToTab = {
      '/': 'home',
      '/dashboard': 'dashboard',
      '/create': 'create',
      '/library': 'library',
      '/analytics': 'analytics',
      '/brand-voice': 'brand-voice',
      '/scheduler': 'scheduler',
      '/settings': 'settings',
      '/pricing': 'pricing',
      '/help': 'help',
      '/auth': 'auth'
    };

    const tab = routeToTab[pathname] || 'home';
    setActiveTab(tab);
  }, [location.pathname]);

  const handleAuth = () => {
    console.log("Auth handler called - navigating to auth page");
    setActiveTab("auth");
    navigate('/auth');
  };

  const handleAuthSuccess = () => {
    console.log("Auth success - navigating to dashboard");
    setActiveTab("dashboard");
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out user");
      await signOut();
      setActiveTab("home");
      navigate('/');
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
    const protectedTabs = ["dashboard", "create", "library", "analytics", "brand-voice", "scheduler", "settings"];
    
    if (protectedTabs.includes(newTab) && !user) {
      console.log("Protected tab requested without auth, redirecting to auth");
      setActiveTab("auth");
      navigate('/auth');
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
      });
      return;
    }
    
    console.log("Changing tab to:", newTab);
    setActiveTab(newTab);
    
    // Navigate to proper route
    const tabToRoute = {
      'home': '/',
      'dashboard': '/dashboard',
      'create': '/create',
      'library': '/library',
      'analytics': '/analytics',
      'brand-voice': '/brand-voice',
      'scheduler': '/scheduler',
      'settings': '/settings',
      'pricing': '/pricing',
      'help': '/help',
      'auth': '/auth'
    };

    const route = tabToRoute[newTab] || '/';
    navigate(route);
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
