
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PullRequestItem from "./PullRequestItem";
import { toast } from "sonner";

interface PullRequest {
  id: number;
  title: string;
  branch: string;
  status: string;
  comments: number;
  updatedAt: string;
}

interface PullRequestsTabProps {
  pullRequests: PullRequest[];
}

const PullRequestsTab = ({ pullRequests }: PullRequestsTabProps) => {
  const handleCreatePR = () => {
    toast.info("Creating new pull request");
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Pull Requests</h3>
          <Button onClick={handleCreatePR}>
            <Plus size={16} className="mr-2" />
            New PR
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pullRequests.map((pr) => (
            <PullRequestItem key={pr.id} {...pr} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PullRequestsTab;
