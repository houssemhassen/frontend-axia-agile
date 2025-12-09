
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";

interface Phase {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "blocked";
  progress: number;
  duration: string;
  deliverables: string[];
}

interface WaterfallPhasesProps {
  projectData?: any;
}

const WaterfallPhases = ({ projectData }: WaterfallPhasesProps) => {
  const [phases] = useState<Phase[]>([
    {
      id: "requirements",
      name: "Requirements Analysis",
      description: "Gather and document all project requirements",
      status: "completed",
      progress: 100,
      duration: "2-4 weeks",
      deliverables: ["Requirements Document", "Use Cases", "Acceptance Criteria"]
    },
    {
      id: "design",
      name: "System Design",
      description: "Create detailed system architecture and design",
      status: "in-progress",
      progress: 65,
      duration: "3-5 weeks",
      deliverables: ["System Architecture", "UI/UX Designs", "Database Schema"]
    },
    {
      id: "implementation",
      name: "Implementation",
      description: "Code development based on approved designs",
      status: "pending",
      progress: 0,
      duration: "8-12 weeks",
      deliverables: ["Source Code", "Code Documentation", "Unit Tests"]
    },
    {
      id: "testing",
      name: "Testing",
      description: "Comprehensive testing of the implemented system",
      status: "pending",
      progress: 0,
      duration: "2-4 weeks",
      deliverables: ["Test Plans", "Test Reports", "Bug Reports"]
    },
    {
      id: "deployment",
      name: "Deployment",
      description: "Deploy and release the system to production",
      status: "pending",
      progress: 0,
      duration: "1-2 weeks",
      deliverables: ["Deployment Guide", "User Manual", "System Documentation"]
    },
    {
      id: "maintenance",
      name: "Maintenance",
      description: "Ongoing support and maintenance",
      status: "pending",
      progress: 0,
      duration: "Ongoing",
      deliverables: ["Support Documentation", "Maintenance Logs", "Updates"]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "blocked":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Waterfall Project Phases</h2>
        <p className="text-muted-foreground">Sequential development approach with distinct phases</p>
        {projectData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{projectData.name}</h3>
            <p className="text-sm text-muted-foreground">{projectData.description}</p>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex items-center gap-4">
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(phase.status)}
                    <div>
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.status.replace("-", " ")}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{phase.duration}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Deliverables:</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables.map((deliverable, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {phase.status === "in-progress" && (
                    <div className="flex gap-2">
                      <Button size="sm">View Tasks</Button>
                      <Button size="sm" variant="outline">Update Progress</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {index < phases.length - 1 && (
              <ArrowRight className="h-6 w-6 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterfallPhases;
