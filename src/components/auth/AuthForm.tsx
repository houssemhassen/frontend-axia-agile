
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, UserCircle, Github, BriefcaseBusiness, Slack, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  type: "login" ;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const AuthForm = ({ type, onSubmit, isLoading = false }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "SuperAdmin", // Default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Updated roles list matching the 6 user roles
  const roles = [
    { value: "SuperAdmin", label: "Super Administrator" },
    { value: "BillingAdmin", label: "Billing Administrator" },
    { value: "ProductOwner", label: "Product Owner" },
    { value: "ScrumMaster", label: "Scrum Master" },
    { value: "Developer", label: "Developer" },
    { value: "ProjectManager", label: "Project Manager" }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {type === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-slate-600 mt-2">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Fill out the form to get started with Axia Agile"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
              placeholder="you@example.com"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
         
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 border border-slate-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {type === "login" && (
          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {type === "login" ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            <>
              {type === "login" ? "Sign in" : "Create account"}
              <ArrowRight size={18} />
            </>
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="h-11 w-full border-slate-300 hover:bg-slate-50"
          >
            <Mail size={20} className="text-slate-600" />
            <span className="sr-only">Continue with Email</span>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="h-11 w-full border-slate-300 hover:bg-slate-50"
          >
            <BriefcaseBusiness size={20} className="text-slate-600" />
            <span className="sr-only">Continue with Microsoft</span>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="h-11 w-full border-slate-300 hover:bg-slate-50"
          >
            <Github size={20} className="text-slate-600" />
            <span className="sr-only">Continue with GitHub</span>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="h-11 w-full border-slate-300 hover:bg-slate-50"
          >
            <Slack size={20} className="text-slate-600" />
            <span className="sr-only">Continue with Slack</span>
          </Button>
        </div>

        {type === "login" ? (
          <div className="text-center text-sm text-slate-600 mt-6">
            New to Axia Agile?{" "}
            <Link to="/role-selection" className="font-medium text-sky-600 hover:text-sky-700 transition-colors">
              Create an account
            </Link>
          </div>
        ) : (
          <div className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-700 transition-colors">
              Sign in
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
