
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitBranch, Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommitItemProps {
  id: string;
  message: string;
  branch: string;
  timestamp: string;
}

const CommitItem = ({ id, message, branch, timestamp }: CommitItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="font-medium">{message}</div>
          <div className="text-xs text-muted-foreground flex items-center flex-wrap gap-2">
            <span className="font-mono bg-muted px-1 py-0.5 rounded">{id.substring(0, 7)}</span>
            <Badge variant="outline" className="flex items-center gap-1 font-normal">
              <GitBranch className="h-3 w-3" />
              {branch}
            </Badge>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Detailed commit information will be shown here when API integration is complete.
          </p>
        </div>
      )}
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button 
          size="sm" 
          variant="ghost"
          className="flex items-center gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          <MessageSquare className="h-4 w-4" />
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <Eye className="h-4 w-4" />
          View Changes
        </Button>
      </div>
    </div>
  );
};

export default CommitItem;
