
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const IssuesList = () => {
  const issues = [
    {
      id: 1,
      title: "API authentication failing in production",
      project: "E-commerce Platform",
      severity: "high",
      assignee: { name: "Alex Johnson", initials: "AJ", avatar: "" },
      reported: "2 days ago"
    },
    {
      id: 2,
      title: "Mobile navigation menu not working on iOS",
      project: "Mobile App Redesign",
      severity: "medium",
      assignee: { name: "Maria Garcia", initials: "MG", avatar: "" },
      reported: "1 day ago"
    },
    {
      id: 3,
      title: "Dashboard charts not loading properly",
      project: "Analytics Dashboard",
      severity: "high",
      assignee: { name: "Sam Wilson", initials: "SW", avatar: "" },
      reported: "3 hours ago"
    },
    {
      id: 4,
      title: "Payment processing timeout on checkout",
      project: "E-commerce Platform",
      severity: "critical",
      assignee: { name: "Dave Chen", initials: "DC", avatar: "" },
      reported: "5 hours ago"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'critical':
        return <Badge variant="destructive" className="bg-red-500">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div key={issue.id} className="flex items-start justify-between p-4 border border-border rounded-lg bg-card/50">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {issue.severity === 'critical' || issue.severity === 'high' ? 
                <AlertCircle className="h-5 w-5 text-red-500" /> : 
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              }
            </div>
            <div>
              <h4 className="font-medium">{issue.title}</h4>
              <div className="flex flex-wrap gap-2 mt-1 items-center text-xs text-muted-foreground">
                <span>{issue.project}</span>
                <span>•</span>
                {getSeverityBadge(issue.severity)}
                <span>•</span>
                <span>Reported {issue.reported}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
              <AvatarFallback className="text-xs">{issue.assignee.initials}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssuesList;
