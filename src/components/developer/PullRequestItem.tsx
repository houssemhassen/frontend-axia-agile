
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PullRequestItemProps {
  id: number;
  title: string;
  branch: string;
  status: string;
  comments: number;
  updatedAt: string;
}

const PullRequestItem = ({ id, title, branch, status, comments, updatedAt }: PullRequestItemProps) => {
  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">
            <span>Branch: {branch}</span>
            <span className="mx-2">•</span>
            <span>Updated {updatedAt}</span>
            {comments > 0 && (
              <>
                <span className="mx-2">•</span>
                <span className="flex items-center inline-flex">
                  <MessageSquare size={12} className="mr-1" />
                  {comments} comments
                </span>
              </>
            )}
          </div>
        </div>
        <Badge variant={
          status === "Approved" ? "default" : 
          status === "Needs Changes" ? "destructive" : 
          "secondary"
        }>
          {status}
        </Badge>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button size="sm" variant="ghost">View Diff</Button>
        <Button size="sm" variant="outline">View PR</Button>
      </div>
    </div>
  );
};

export default PullRequestItem;
