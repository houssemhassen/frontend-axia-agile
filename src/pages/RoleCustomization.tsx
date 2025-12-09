import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthModal } from "@/components/auth/AuthModal";

// Define customization options for each role
const customizationOptions = {
  productOwner: [
    { id: "roadmap", label: "Roadmap View", description: "Visualize product timeline and milestones" },
    { id: "backlog", label: "Backlog Structure", description: "Organize and prioritize product backlog items" },
    { id: "valueMetrics", label: "Value Metrics", description: "Track business value and ROI of features" },
  ],
  developer: [
    { id: "frontend", label: "Frontend Development", description: "Focus on UI/UX and client-side technologies" },
    { id: "backend", label: "Backend Development", description: "Focus on APIs, databases, and server-side logic" },
    { id: "fullstack", label: "Full-Stack Development", description: "Balance both frontend and backend work" },
  ],
  scrumMaster: [
    { id: "sprint", label: "Sprint Templates", description: "Configure sprint planning templates" },
    { id: "metrics", label: "Agile Metrics", description: "Track team velocity and sprint burndown" },
    { id: "facilitation", label: "Meeting Facilitation", description: "Tools for retrospectives and planning sessions" },
  ],
  tester: [
    { id: "manual", label: "Manual Testing", description: "Create and manage manual test cases" },
    { id: "automated", label: "Automated Testing", description: "Set up automated testing workflows" },
    { id: "reporting", label: "QA Reporting", description: "Standardize bug tracking and reporting formats" },
  ],
};

type RoleOption = keyof typeof customizationOptions;

const RoleCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the selected role from location state or session storage
  const selectedRole = (
    location.state?.selectedRole || 
    sessionStorage.getItem("selectedRole") || 
    "developer"
  ) as RoleOption;
  
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("login");
  
  const options = customizationOptions[selectedRole] || customizationOptions.developer;

  const handleOpenLoginModal = () => {
    setActiveAuthTab("login");
    setAuthModalOpen(true);
  };

  const handleOpenRegisterModal = () => {
    setActiveAuthTab("register");
    setAuthModalOpen(true);
  };
  
  const handleSaveAndContinue = () => {
    setIsLoading(true);
    
    // Store user role and preferences
    localStorage.setItem("userRole", selectedRole);
    if (selectedOption) {
      localStorage.setItem("userPreference", selectedOption);
    }
    
    // Show success message
    toast.success("Profile configured successfully!", {
      description: "Redirecting to your personalized dashboard."
    });
    
    // Simulate a brief loading state before redirecting
    setTimeout(() => {
      navigate("/signup", { 
        state: { 
          selectedRole,
          selectedPreference: selectedOption
        } 
      });
      setIsLoading(false);
    }, 1000);
  };
  
  const goBack = () => {
    navigate("/role-selection");
  };

  const getRoleDisplayName = () => {
    switch (selectedRole) {
      case "productOwner": return "Product Owner";
      case "scrumMaster": return "Scrum Master";
      case "tester": return "QA Specialist";
      default: return "Developer";
    }
  };

  return (
    <>
      <PublicLayout
        title="Customize Your Experience | Axia Agile"
        description="Customize your Axia Agile experience"
        onLoginClick={handleOpenLoginModal}
        onRegisterClick={handleOpenRegisterModal}
        containerClassName="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent"
      >
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customize Your Experience
            </h1>
            <p className="text-lg text-muted-foreground">
              Tailor Axia Agile to your specific needs as a{" "}
              <span className="font-medium text-primary">
                {getRoleDisplayName()}
              </span>
            </p>
          </div>

          <Card className="mb-8 border border-border shadow-sm">
            <CardContent className="pt-6">
              <RadioGroup 
                value={selectedOption} 
                onValueChange={setSelectedOption}
                className="space-y-4"
              >
                {options.map((option) => (
                  <div 
                    key={option.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 ${
                      selectedOption === option.id ? "bg-primary/10" : "hover:bg-secondary/50"
                    }`}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <div className="flex-1">
                      <Label 
                        htmlFor={option.id} 
                        className="text-lg font-medium cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <p className="text-muted-foreground">{option.description}</p>
                    </div>
                    {selectedOption === option.id && (
                      <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <CardFooter className="px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between">
              <Button 
                variant="outline" 
                onClick={goBack}
                className="gap-2 sm:w-auto w-full"
              >
                <ArrowLeft size={18} />
                Back to Role Selection
              </Button>
              <Button 
                onClick={handleSaveAndContinue}
                disabled={isLoading}
                className="gap-2 sm:w-auto w-full"
              >
                {isLoading ? "Processing..." : "Save & Continue"}
                {!isLoading && <ArrowRight size={18} />}
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              You can change these preferences later in your account settings.
            </p>
          </div>
        </div>
      </PublicLayout>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab={activeAuthTab} 
      />
    </>
  );
};

export default RoleCustomization;