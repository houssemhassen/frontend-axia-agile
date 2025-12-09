import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Check, ArrowRight, Users, Code, ListTodo, TestTube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthModal } from "@/components/auth/AuthModal";

// Define the roles with their details
const roles = [
  {
    id: "productOwner",
    title: "Product Owner",
    description: "I manage product backlog, value delivery, and stakeholder communication.",
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    id: "developer",
    title: "Developer / Engineer",
    description: "I work on software development, tasks, and coding.",
    icon: <Code className="h-10 w-10 text-primary" />,
  },
  {
    id: "scrumMaster",
    title: "Scrum Master / Agile Coach",
    description: "I facilitate Agile processes, stand-ups, and sprint planning.",
    icon: <ListTodo className="h-10 w-10 text-primary" />,
  },
  {
    id: "tester",
    title: "QA / Tester",
    description: "I'm responsible for testing, quality assurance, and bug tracking.",
    icon: <TestTube className="h-10 w-10 text-primary" />,
  },
];

const roleDisplayNames = {
  productOwner: "Product Owner",
  developer: "Developer",
  scrumMaster: "Scrum Master",
  tester: "QA Tester"
};

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("login");

  const handleOpenLoginModal = () => {
    setActiveAuthTab("login");
    setAuthModalOpen(true);
  };

  const handleOpenRegisterModal = () => {
    setActiveAuthTab("register");
    setAuthModalOpen(true);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }

    // Store the selected role in session storage
    sessionStorage.setItem("selectedRole", selectedRole);
    
    toast.success("Role selected successfully!", {
      description: `Proceeding as ${roleDisplayNames[selectedRole as keyof typeof roleDisplayNames]}`
    });

    // Navigate to role customization
    navigate("/role-customization", { 
      state: { selectedRole } 
    });
  };

  return (
    <>
      <PublicLayout
        title="Select Your Role | Axia Agile"
        description="Choose your role to get started with Axia Agile"
        onLoginClick={handleOpenLoginModal}
        onRegisterClick={handleOpenRegisterModal}
        containerClassName="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent"
      >
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Role
            </h1>
            <p className="text-lg text-muted-foreground">
              Select the role that best describes your position to get a personalized experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role.id
                    ? "ring-2 ring-primary bg-primary/5 scale-[1.02]"
                    : "hover:scale-[1.01]"
                }`}
                onClick={() => setSelectedRole(role.id)}
                data-testid={`role-card-${role.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {role.icon}
                    </div>
                    {selectedRole === role.id && (
                      <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{role.title}</h3>
                  <p className="text-muted-foreground">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedRole}
              className="gap-2 mb-6 transition-all duration-200 hover:opacity-90 min-w-[200px]"
              data-testid="continue-button"
            >
              {selectedRole
                ? `Proceed as ${roleDisplayNames[selectedRole as keyof typeof roleDisplayNames]}`
                : "Continue"}
              <ArrowRight size={18} />
            </Button>

            <p className="text-sm text-muted-foreground">
              Need a different role?{" "}
              <Link
                to="#"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Support contact feature coming soon!");
                }}
              >
                Contact Support
              </Link>
            </p>

            <div className="mt-6 text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Log In
              </Link>
            </div>
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

export default RoleSelection;