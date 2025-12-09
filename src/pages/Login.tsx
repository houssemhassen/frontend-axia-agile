import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { Github, Mail, Slack, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/layout/Header";
import AuthForm from "../components/auth/AuthForm";
import Footer from "../components/layout/Footer";
import { authService } from "@/services/authService";
import { UserRole } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        if (currentUser.status === "pending") {
          navigate("/approval-status");
        } else {
          // Redirect to role-specific dashboard
          const roleRedirects: Record<UserRole, string> = {
            'SuperAdmin': '/superadmin',
            'BillingAdmin': '/billing',
            'ProductOwner': '/product-owner',
            'ScrumMaster': '/scrum-master',
            'Developer': '/developer',
            'ProjectManager': '/project-manager'
          };
          
          const redirectPath = roleRedirects[currentUser.role] || '/dashboard';
          navigate(redirectPath, { state: { role: currentUser.role } });
        }
      }
    }
  }, [navigate]);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password
      });

      toast.success(`Welcome back, ${response.user.firstName}!`, {
        description: `Logged in as ${response.user.role}`
      });

      // Redirect to role-specific dashboard
      const roleRedirects: Record<UserRole, string> = {
        'SuperAdmin': '/superadmin',
        'BillingAdmin': '/billing',
        'ProductOwner': '/product-owner',
        'ScrumMaster': '/scrum-master',
        'Developer': '/developer',
        'ProjectManager': '/project-manager'
      };

      const redirectPath = roleRedirects[response.user.role] || '/dashboard';
      navigate(redirectPath, { state: { role: response.user.role } });
      
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "Please check your credentials"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // For now, simulate social login - in real app this would handle OAuth flow
      toast.info(`${provider} login coming soon!`, {
        description: "Social login will be available in the next update"
      });
    } catch (error) {
      toast.error("Social login failed", {
        description: error instanceof Error ? error.message : "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Axia Agile</title>
        <meta name="description" content="Sign in to your Axia Agile account" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/50 to-transparent animate-fade-in">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200">
              <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
              
              {/* Test Accounts Section */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Test Accounts</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Super Admin:</strong> admin@test.com</div>
                    <div><strong>Billing Admin:</strong> billing@test.com</div>
                    <div><strong>Product Owner:</strong> product@test.com</div>
                    <div><strong>Scrum Master:</strong> scrum@test.com</div>
                    <div><strong>Developer:</strong> dev@test.com</div>
                    <div><strong>Project Manager:</strong> pm@test.com</div>
                    <div className="col-span-2"><strong>Password:</strong> test123</div>
                  </div>
                </div>
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300"
                  onClick={() => handleSocialLogin("Email")}
                  disabled={isLoading}
                >
                  <Mail size={20} className="text-slate-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300"
                  onClick={() => handleSocialLogin("Microsoft")}
                  disabled={isLoading}
                >
                  <BriefcaseBusiness size={20} className="text-slate-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300"
                  onClick={() => handleSocialLogin("GitHub")}
                  disabled={isLoading}
                >
                  <Github size={20} className="text-slate-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300"
                  onClick={() => handleSocialLogin("Slack")}
                  disabled={isLoading}
                >
                  <Slack size={20} className="text-slate-600" />
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-slate-600">
                  New to Axia Agile?{" "}
                  <Link 
                    to="/role-selection" 
                    className="font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Login;
