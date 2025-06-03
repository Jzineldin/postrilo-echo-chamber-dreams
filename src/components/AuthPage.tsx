import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBackToHome: () => void;
}

export const AuthPage = ({ onAuthSuccess, onBackToHome }: AuthPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp, resetPassword } = useAuth();
  const { userRole, isAdmin } = useUserRole();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [resetEmail, setResetEmail] = useState("");

  console.log("AuthPage rendered with props:", { onAuthSuccess: !!onAuthSuccess, onBackToHome: !!onBackToHome });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted with email:", loginData.email);
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Calling signIn...");
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log("Login successful! Calling onAuthSuccess...");
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in."
        });
        onAuthSuccess();
      }
    } catch (error) {
      console.error("Login exception:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form submitted with email:", signupData.email);
    
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Calling signUp...");
      const { error } = await signUp(signupData.email, signupData.password, {
        full_name: signupData.name
      });

      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log("Signup successful! Calling onAuthSuccess...");
        toast({
          title: "Account Created!",
          description: "Welcome to Postrilo! Your account has been created successfully."
        });
        onAuthSuccess();
      }
    } catch (error) {
      console.error("Signup exception:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(resetEmail);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Reset link sent!",
          description: `Password reset instructions have been sent to ${resetEmail}`
        });
        setResetEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="mb-6">
        <Button 
          onClick={() => {
            console.log("Back to home clicked");
            onBackToHome();
          }}
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Postrilo
            </CardTitle>
            {isAdmin && (
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
          {userRole && (
            <p className="text-sm text-gray-600">
              Current role: <span className="font-medium capitalize">{userRole}</span>
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Start Creating Free</TabsTrigger>
              <TabsTrigger value="login">Sign In</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password (min 6 characters)"
                      className="pl-10 pr-10"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Start Creating Free"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Tabs defaultValue="reset" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="reset">Forgot Password?</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reset">
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
