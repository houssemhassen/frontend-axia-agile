import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, Chrome, Github
} from "lucide-react";

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

// --------------
// Types
// --------------
interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login";
}

// Map roles → routes
const ROLE_ROUTES: Record<string, string> = {
  superadmin: "/superadmin",
  Administrateur : "/admin",
  billingadmin: "/billing",
  productowner: "/product-owner",
  scrummaster: "/scrum-master",
  developer: "/developer",
  projectmanager: "/project-manager",
};

// --------------
// Component
// --------------
export const AuthModal = ({
  open,
  onOpenChange,
  defaultTab = "login",
}: AuthModalProps) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Reset tab when modal opens
  useEffect(() => {
    if (open) setActiveTab(defaultTab);
  }, [open, defaultTab]);

  // --------------
  // Helpers
  // --------------
  const navigateByRole = (role: string) => {
    const route = ROLE_ROUTES[role.toLowerCase()] || "/dashboard";
    navigate(route);
  };

  const handleInputChange = (field: "email" | "password", value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  // --------------
  // Login handler
  // --------------
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(loginData);

      toast.success("Login successful!", {
        description: "Welcome back to Axia Agile.",
      });

      navigateByRole(response.roleName);
      onOpenChange(false);
    } catch (error) {
      toast.error("Login failed", {
        description:
          error instanceof Error ? error.message : "Please check your credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --------------
  // Social Auth
  // --------------
  const handleSocialAuth = async (provider: string, isSignup = false) => {
    setIsLoading(true);

    try {
      const response = await authService.socialLogin({
        provider: provider.toLowerCase() as any,
        code: "mock-auth-code",
        redirectUri: window.location.origin,
      });

      toast.success(
        `${isSignup ? "Signed up" : "Logged in"} with ${provider}!`,
        {
          description: isSignup
            ? "Your account is now pending approval."
            : "Welcome back to Axia Agile.",
        }
      );

      if (isSignup) {
        navigate("/approval-status");
      } else {
        navigateByRole(response.user.roles[0]);
      }

      onOpenChange(false);
    } catch {
      toast.error(`${provider} authentication failed`, {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --------------
  // UI
  // --------------
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

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login")}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="login">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            {/* --- LOGIN FORM --- */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10"
                    required
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
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

            {/* --- SOCIAL LOGINS --- */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
