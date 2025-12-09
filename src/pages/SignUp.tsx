
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, ArrowRight, Slack, Mail, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false as any,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    console.log("Signup data:", data);

    try {
      setTimeout(() => {
        const userData = {
          ...data,
          id: `user-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: "pending", // Set status to pending for new signups
        };
        
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        localStorage.setItem("users", JSON.stringify([...existingUsers, userData]));
        
        localStorage.setItem("currentUser", JSON.stringify({
          ...userData,
          isLoggedIn: true
        }));
        
        // Set a default role for the user
        localStorage.setItem("userRole", "developer");
        
        toast.success("Account created successfully!", {
          description: "Your account is now pending approval."
        });
        
        navigate("/approval-status");
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Failed to create account", {
        description: "There was an error creating your account. Please try again."
      });
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social authentication
    setTimeout(() => {
      // Create mock user data based on the provider
      const mockUserData = {
        id: `user-${Date.now()}`,
        firstName: "User",
        lastName: provider,
        email: `user.${provider.toLowerCase()}@example.com`,
        createdAt: new Date().toISOString(),
        provider: provider,
        status: "pending", // Set status to pending for new signups
        isLoggedIn: true
      };
      
      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      localStorage.setItem("users", JSON.stringify([...existingUsers, mockUserData]));
      localStorage.setItem("currentUser", JSON.stringify(mockUserData));
      
      // Set a default role
      localStorage.setItem("userRole", "developer");
      
      // Show success message
      toast.success(`Signed up with ${provider}!`, {
        description: "Your account is now pending approval."
      });
      
      // Navigate to approval status
      navigate("/approval-status");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Create Account | Axia Agile</title>
        <meta name="description" content="Sign up to streamline Agile project management" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/50 to-transparent animate-fade-in">
          <div className="w-full max-w-xl">
            <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                  Sign up to streamline Agile project management
                </h1>
                <p className="text-slate-600 mt-2">
                  Create your account and get started with Axia Agile
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="border-slate-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="border-slate-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="border-slate-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="border-slate-300" />
                        </FormControl>
                        <p className="text-xs text-slate-500 mt-1">
                          Password must be at least 8 characters
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="border-slate-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true ? true : false);
                            }}
                            className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-slate-600">
                            I agree to the{" "}
                            <Link
                              to="#"
                              className="text-sky-600 hover:text-sky-700 transition-colors"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="#"
                              className="text-sky-600 hover:text-sky-700 transition-colors"
                            >
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create my account"}
                    <ArrowRight size={18} />
                  </Button>
                </form>
              </Form>

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
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300 hover:bg-slate-50"
                  onClick={() => handleSocialSignUp("Email")}
                  disabled={isLoading}
                >
                  <Mail size={20} className="text-slate-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300 hover:bg-slate-50"
                  onClick={() => handleSocialSignUp("Microsoft")}
                  disabled={isLoading}
                >
                  <BriefcaseBusiness size={20} className="text-slate-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300 hover:bg-slate-50"
                  onClick={() => handleSocialSignUp("GitHub")}
                  disabled={isLoading}
                >
                  <Github size={20} className="text-slate-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-full border-slate-300 hover:bg-slate-50"
                  onClick={() => handleSocialSignUp("Slack")}
                  disabled={isLoading}
                >
                  <Slack size={20} className="text-slate-600" />
                </Button>
              </div>

              <div className="text-center text-sm text-slate-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-sky-600 hover:text-sky-700 transition-colors"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SignUp;
