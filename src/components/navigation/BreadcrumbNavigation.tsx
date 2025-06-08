
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from 'lucide-react';

const routeLabels = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/create': 'Create Content',
  '/library': 'Content Library',
  '/analytics': 'Analytics',
  '/brand-voice': 'Brand Voice',
  '/scheduler': 'Scheduler',
  '/settings': 'Settings',
  '/pricing': 'Pricing',
  '/help': 'Help & Support',
  '/auth': 'Authentication'
};

interface BreadcrumbNavigationProps {
  items?: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  onNavigate?: (href: string) => void;
  showHome?: boolean;
}

export const BreadcrumbNavigation = ({ 
  items, 
  onNavigate,
  showHome = true 
}: BreadcrumbNavigationProps) => {
  const location = useLocation();
  
  // Don't show breadcrumbs on home page or auth page
  if (location.pathname === '/' || location.pathname === '/auth') {
    return null;
  }

  // Use passed items or generate from route
  const breadcrumbItems = items || [
    { label: 'Dashboard', href: '/dashboard' }
  ];

  // Add current page if it's not dashboard and no custom items provided
  if (!items && location.pathname !== '/dashboard') {
    const currentLabel = routeLabels[location.pathname] || 'Page';
    breadcrumbItems.push({ label: currentLabel, href: location.pathname, current: true });
  }

  const handleNavigation = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {showHome && (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    <Home className="w-4 h-4" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            
            {breadcrumbItems.length > 1 && breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href || item.label}>
                {(showHome || index > 0) && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {item.current || index === breadcrumbItems.length - 1 ? (
                    <BreadcrumbPage className="text-gray-900 font-medium">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.href || '#'} 
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => item.href && handleNavigation(item.href)}
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
