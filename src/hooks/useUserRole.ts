
import { useAuth } from './useAuth';

export const useUserRole = () => {
  const { user } = useAuth();
  
  // Define admin emails or check against a role field in the user object
  const adminEmails = ['admin@example.com', 'sofia_reuterving@hotmail.com'];
  const isAdmin = user?.email ? adminEmails.includes(user.email) : false;
  
  return {
    isAdmin,
    isUser: !!user,
    userRole: isAdmin ? 'admin' : user ? 'user' : 'guest'
  };
};
