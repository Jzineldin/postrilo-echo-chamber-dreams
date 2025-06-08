import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useResponsiveNavigation } from "./useResponsiveNavigation";
import { TemplateService } from "@/services/templateService";

export const useAppNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    navigateWithDebounce, 
    isNavigating: isResponsiveNavigating,
    cancelNavigation 
  } = useResponsiveNavigation({
    debounceMs: 250,
    enableHapticFeedback: true
  });

  console.log("App navigation state:", { 
    activeTab, 
    user: !!user, 
    loading, 
    currentPath: location.pathname,
    isNavigating: isResponsiveNavigating
  });

  // Initialize template service on mount
  useEffect(() => {
    TemplateService.getInstance().initialize();
  }, []);

  // Clean up any hash-based URLs on mount
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/#') && !currentUrl.includes('#/')) {
      const hashPart = window.location.hash.replace('#', '');
      if (hashPart && hashPart !== '') {
        console.log("Cleaning up hash-based URL:", hashPart);
        window.history.replaceState(null, '', `/${hashPart}`);
        navigateWithDebounce(`/${hashPart}`);
        return;
      }
    }
  }, [navigateWithDebounce]);

  // Handle route-based navigation
  useEffect(() => {
    const pathname = location.pathname;
    console.log("Route changed to:", pathname);
    
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
    navigateWithDebounce('/auth');
  };

  const handleAuthSuccess = () => {
    console.log("Auth success - navigating to dashboard");
    setActiveTab("dashboard");
    navigateWithDebounce('/dashboard');
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out user");
      await signOut();
      setActiveTab("home");
      navigateWithDebounce('/');
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
    
    // Prevent duplicate navigation
    if (isResponsiveNavigating || activeTab === newTab) {
      console.log("Navigation blocked - already navigating or same tab");
      return;
    }
    
    // Check if user needs to be authenticated for protected tabs
    const protectedTabs = ["dashboard", "create", "library", "analytics", "brand-voice", "scheduler", "settings"];
    
    if (protectedTabs.includes(newTab) && !user) {
      console.log("Protected tab requested without auth, redirecting to auth");
      setActiveTab("auth");
      navigateWithDebounce('/auth');
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
      });
      return;
    }
    
    console.log("Changing tab to:", newTab);
    setActiveTab(newTab);
    
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
    navigateWithDebounce(route);
  };

  return {
    activeTab,
    user,
    loading,
    isNavigating: isResponsiveNavigating,
    handleAuth,
    handleAuthSuccess,
    handleLogout,
    handleTabChange,
    cancelNavigation
  };
};
