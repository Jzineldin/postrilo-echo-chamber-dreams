
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email || 'no user');
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session?.user?.email || 'no session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    console.log("signUp called for:", email);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name || userData?.name,
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            ...userData
          }
        }
      });
      console.log("SignUp result:", error ? `Error: ${error.message}` : "Success");
      return { error };
    } catch (err) {
      console.error("SignUp exception:", err);
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("signIn called for:", email);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log("SignIn result:", error ? `Error: ${error.message}` : "Success");
      return { error };
    } catch (err) {
      console.error("SignIn exception:", err);
      return { error: err };
    }
  };

  const signOut = async () => {
    console.log("signOut called");
    try {
      const { error } = await supabase.auth.signOut();
      console.log("SignOut result:", error ? `Error: ${error.message}` : "Success");
      return { error };
    } catch (err) {
      console.error("SignOut exception:", err);
      return { error: err };
    }
  };

  const resetPassword = async (email: string) => {
    console.log("resetPassword called for:", email);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      console.log("ResetPassword result:", error ? `Error: ${error.message}` : "Success");
      return { error };
    } catch (err) {
      console.error("ResetPassword exception:", err);
      return { error: err };
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
