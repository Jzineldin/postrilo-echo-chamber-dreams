
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { SecurityService } from './securityService';

export class AuthGuard {
  /**
   * Ensures user is authenticated before allowing access
   */
  static useRequireAuth() {
    const { user, loading } = useAuth();
    
    if (loading) return { isAuthenticated: false, isLoading: true };
    
    if (!user) {
      SecurityService.logSecurityEvent('unauthorized_access_attempt', 'anonymous', {
        path: window.location.pathname
      });
      return { isAuthenticated: false, isLoading: false };
    }
    
    return { isAuthenticated: true, isLoading: false, user };
  }

  /**
   * Ensures user has admin role
   */
  static useRequireAdmin() {
    const { user } = useAuth();
    const userRoleData = useUserRole();
    
    // Handle both possible return types from useUserRole
    const isAdmin = 'isAdmin' in userRoleData ? userRoleData.isAdmin : false;
    const loading = 'loading' in userRoleData ? userRoleData.loading : false;
    
    if (loading) return { hasAccess: false, isLoading: true };
    
    if (!user || !isAdmin) {
      SecurityService.logSecurityEvent('admin_access_attempt', user?.id || 'anonymous', {
        path: window.location.pathname,
        userRole: isAdmin ? 'admin' : 'user'
      });
      return { hasAccess: false, isLoading: false };
    }
    
    return { hasAccess: true, isLoading: false, user };
  }

  /**
   * Validates session is still active
   */
  static async validateSession(user: any): Promise<boolean> {
    if (!user) return false;
    
    // Check if token is still valid (simplified check)
    const tokenAge = Date.now() - (user.created_at ? new Date(user.created_at).getTime() : 0);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      SecurityService.logSecurityEvent('session_expired', user.id, { tokenAge });
      return false;
    }
    
    return true;
  }
}
