
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useAppNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("App navigation state:", { activeTab, user: !!user, loading, currentPath: location.pathname });

  // Clean up any hash-based URLs on mount
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/#') && !currentUrl.includes('#/')) {
      // Extract the hash part and convert to proper route
      const hashPart = window.location.hash.replace('#', '');
      if (hashPart && hashPart !== '') {
        console.log("Cleaning up hash-based URL:", hashPart);
        window.history.replaceState(null, '', `/${hashPart}`);
        navigate(`/${hashPart}`, { replace: true });
        return;
      }
    }
  }, [navigate]);

  // Handle route-based navigation
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
    setIsNavigating(false); // Clear loading state when navigation completes
  }, [location.pathname]);

  const handleAuth = () => {
    console.log("Auth handler called - navigating to auth page");
    setIsNavigating(true);
    setActiveTab("auth");
    navigate('/auth');
  };

  const handleAuthSuccess = () => {
    console.log("Auth success - navigating to dashboard");
    setIsNavigating(true);
    setActiveTab("dashboard");
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out user");
      setIsNavigating(true);
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
    } finally {
      setIsNavigating(false);
    }
  };

  const handleTabChange = (newTab: string) => {
    console.log("Tab change requested:", { from: activeTab, to: newTab });
    
    // Prevent duplicate navigation
    if (isNavigating || activeTab === newTab) {
      return;
    }
    
    // Check if user needs to be authenticated for protected tabs
    const protectedTabs = ["dashboard", "create", "library", "analytics", "brand-voice", "scheduler", "settings"];
    
    if (protectedTabs.includes(newTab) && !user) {
      console.log("Protected tab requested without auth, redirecting to auth");
      setIsNavigating(true);
      setActiveTab("auth");
      navigate('/auth');
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
      });
      return;
    }
    
    console.log("Changing tab to:", newTab);
    setIsNavigating(true);
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
    isNavigating,
    handleAuth,
    handleAuthSuccess,
    handleLogout,
    handleTabChange
  };
};
