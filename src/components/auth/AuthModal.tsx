import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Chrome, Github, Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { authService } from "@/services/authService";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register"; // ✅ Added defaultTab prop
}

export const AuthModal = ({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab); // ✅ Use defaultTab prop
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // ✅ Update activeTab when defaultTab prop changes or modal opens
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, open]);

  // ✅ Updated login handler to use authService properly
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the authService which includes test accounts
  //    console.log('Attempting login with:', loginData);
      const response = await authService.login({
        email: loginData.email,
        password: loginData.password
      });

      toast.success("Login successful!", {
        description: "Welcome back to Axia Agile."
      });

      // Navigate based on user role
      const userRole = response.user.roles[0].toLowerCase();
      
      const roleRoutes: Record<string, string> = {
        'superadmin': '/superadmin',
        'billingadmin': '/billing',
        'productowner': '/product-owner',
        'scrummaster': '/scrum-master',
        'developer': '/developer',
        'projectmanager': '/project-manager'
      };

      const route = roleRoutes[userRole] || '/dashboard';
      navigate(route);
      
      onOpenChange(false);
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "Please check your credentials"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await authService.register({
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        role: 'Developer' // Default role for registration
      });

      toast.success("Account created successfully!", {
        description: "Your account is now pending approval."
      });
      
      navigate("/approval-status");
      onOpenChange(false);
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string, isSignup = false) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, create a mock social login
      const mockSocialData = {
        provider: provider as 'google' | 'github' | 'microsoft' | 'slack',
        code: 'mock-auth-code',
        redirectUri: window.location.origin
      };

      const response = await authService.socialLogin(mockSocialData);
      
      toast.success(`${isSignup ? 'Signed up' : 'Logged in'} with ${provider}!`, {
        description: isSignup ? "Your account is now pending approval." : "Welcome back to Axia Agile."
      });

      if (isSignup) {
        navigate("/approval-status");
      } else {
        const userRole = response.user.roles[0].toLowerCase();
        const roleRoutes: Record<string, string> = {
          'superadmin': '/superadmin',
          'billingadmin': '/billing',
          'productowner': '/product-owner',
          'scrummaster': '/scrum-master',
          'developer': '/developer',
          'projectmanager': '/project-manager'
        };

        const route = roleRoutes[userRole] || '/dashboard';
        navigate(route);
      }
      
      onOpenChange(false);
    } catch (error) {
      toast.error(`${provider} authentication failed`, {
        description: error instanceof Error ? error.message : "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-indigo-700">
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-600">
            {activeTab === "login"
              ? "Sign in to your account to continue"
              : "Get started with your agile project management"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleSocialAuth("Google")}
                disabled={isLoading}
                className="w-full"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialAuth("GitHub")}
                disabled={isLoading}
                className="w-full"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-firstname">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-firstname"
                      type="text"
                      placeholder="First name"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-lastname">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-lastname"
                      type="text"
                      placeholder="Last name"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleSocialAuth("Google", true)}
                disabled={isLoading}
                className="w-full"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialAuth("GitHub", true)}
                disabled={isLoading}
                className="w-full"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};