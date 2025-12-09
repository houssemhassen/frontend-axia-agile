
import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface FeatureUnderDevelopmentProps {
  title?: string;
  description?: string;
  featureName: string;
}

const FeatureUnderDevelopment = ({
  title = "Coming Soon",
  description = "Feature Under Development",
  featureName
}: FeatureUnderDevelopmentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Get message based on feature
  const getFeatureMessage = () => {
    switch(featureName) {
      case "code":
        return "The Code repository integration is coming soon.";
      case "pull-requests":
        return "The Pull Requests management feature is under development.";
      case "report-bug":
        return "The Bug reporting system is currently being implemented.";
      default:
        return "This feature is currently under development and will be available soon.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="flex flex-col items-center text-center space-y-2">
          <div className="h-20 w-20 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
            <Construction size={40} />
          </div>
          
          <CardTitle className="text-4xl font-bold">
            {title}
          </CardTitle>
          
          <CardDescription className="text-xl">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            {getFeatureMessage()}
            <br />
            <span className="text-sm font-medium mt-2 block">
              Attempted path: <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code>
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="w-full" 
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeatureUnderDevelopment;
