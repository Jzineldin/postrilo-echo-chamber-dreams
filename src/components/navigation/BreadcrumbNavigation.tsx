
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

export const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  // Don't show breadcrumbs on home page or auth page
  if (location.pathname === '/' || location.pathname === '/auth') {
    return null;
  }

  const breadcrumbItems = [
    { path: '/dashboard', label: 'Dashboard' }
  ];

  // Add current page if it's not dashboard
  if (location.pathname !== '/dashboard') {
    const currentLabel = routeLabels[location.pathname] || 'Page';
    breadcrumbItems.push({ path: location.pathname, label: currentLabel });
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {breadcrumbItems.length > 1 && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 font-medium">
                    {breadcrumbItems[breadcrumbItems.length - 1].label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
