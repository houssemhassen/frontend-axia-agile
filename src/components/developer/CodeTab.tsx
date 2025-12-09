
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import CommitItem from "./CommitItem";
import { toast } from "sonner";

interface Commit {
  id: string;
  message: string;
  branch: string;
  timestamp: string;
}

interface CodeTabProps {
  commits: Commit[];
}

const CodeTab = ({ commits }: CodeTabProps) => {
  const navigate = useNavigate();
  
  const handleViewRepository = () => {
    navigate('/developer/code');
    toast.info("Viewing code repository");
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Recent Commits</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {commits.map((commit) => (
            <CommitItem key={commit.id} {...commit} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleViewRepository}
        >
          View Repository
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeTab;
