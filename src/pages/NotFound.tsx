
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Automatically redirect to home if the user tried to access /login
    if (location.pathname === "/login") {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    // Get the user role from localStorage to direct them to the appropriate home
    const userRole = localStorage.getItem("userRole") || "projectManager";
    navigate("/", { state: { role: userRole } });
  };

  // Check if the path is a missing feature based on patterns
  const isMissingFeature = (path: string) => {
    const featurePatterns = [
      "/sprint-board",
      "/standups",
      "/retrospectives",
      "/blockers",
      "/test-cases",
      "/bugs",
      "/coverage",
      "/design-tasks",
      "/prototypes",
      "/handoff",
      "/analytics",
      "/feedback",
      "/roadmap",
      "/project-status",
      "/reviews",
      "/feature-requests"
    ];
    
    return featurePatterns.some(pattern => path.includes(pattern));
  };

  const getMissingFeatureMessage = () => {
    if (location.pathname.includes("sprint-board")) {
      return "The Sprint Board feature is currently under development.";
    } else if (location.pathname.includes("standups")) {
      return "The Stand-ups feature is coming soon to help you manage daily team check-ins.";
    } else if (location.pathname.includes("retrospectives")) {
      return "The Retrospectives feature is being implemented to help teams reflect on their work.";
    } else if (location.pathname.includes("blockers")) {
      return "The Blockers tracking feature is under development to help identify and resolve impediments.";
    } else if (location.pathname.includes("test-cases") || location.pathname.includes("bugs") || location.pathname.includes("coverage")) {
      return "Testing tools are being integrated and will be available soon.";
    } else if (location.pathname.includes("design") || location.pathname.includes("prototypes") || location.pathname.includes("handoff")) {
      return "Design tools integration is under development.";
    } else if (location.pathname.includes("analytics") || location.pathname.includes("feedback") || location.pathname.includes("roadmap")) {
      return "Analytics and feedback tools are coming soon.";
    } else if (location.pathname.includes("project-status") || location.pathname.includes("reviews") || location.pathname.includes("feature-requests")) {
      return "Client project management features are under development.";
    }
    return "This feature is currently under development and will be available soon.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="flex flex-col items-center text-center space-y-2">
          {isMissingFeature(location.pathname) ? (
            <div className="h-20 w-20 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
              <Construction size={40} />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-4">
              <AlertTriangle size={40} />
            </div>
          )}
          
          <CardTitle className="text-4xl font-bold">
            {isMissingFeature(location.pathname) ? "Coming Soon" : "404"}
          </CardTitle>
          
          <CardDescription className="text-xl">
            {isMissingFeature(location.pathname) ? "Feature Under Development" : "Page Not Found"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            {isMissingFeature(location.pathname) 
              ? getMissingFeatureMessage()
              : "The page you're looking for doesn't exist or has been moved."
            }
            <br />
            <span className="text-sm font-medium mt-2 block">
              Attempted path: <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code>
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="w-full" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleGoHome}>
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
