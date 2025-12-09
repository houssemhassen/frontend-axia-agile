
import React from 'react';
import { toast } from "sonner";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StatusIndicator from "@/components/data-display/StatusIndicator";

interface Project {
  id: string;
  name: string;
  progress: number;
  velocity: number;
  deadline: string;
  hasIssues: boolean;
  status: "on-track" | "at-risk" | "behind";
}

interface ProjectPortfolioTabProps {
  projectFilter: string;
  setProjectFilter: (filter: string) => void;
}

const ProjectPortfolioTab: React.FC<ProjectPortfolioTabProps> = ({ 
  projectFilter, 
  setProjectFilter 
}) => {
  // Sample data for the dashboard
  const projects: Project[] = [
    { 
      id: "proj-1", 
      name: "E-Commerce Platform", 
      progress: 65, 
      velocity: 18, 
      deadline: "2025-08-15", 
      hasIssues: true,
      status: "on-track"
    },
    { 
      id: "proj-2", 
      name: "Mobile Banking App", 
      progress: 42, 
      velocity: 12, 
      deadline: "2025-07-20", 
      hasIssues: false,
      status: "at-risk"
    },
    { 
      id: "proj-3", 
      name: "Customer Portal", 
      progress: 89, 
      velocity: 22, 
      deadline: "2025-05-30", 
      hasIssues: true,
      status: "behind"
    },
    { 
      id: "proj-4", 
      name: "Internal Dashboard", 
      progress: 75, 
      velocity: 16, 
      deadline: "2025-09-10", 
      hasIssues: false,
      status: "on-track"
    }
  ];

  const handleProjectClick = (projectId: string) => {
    toast.info(`Navigating to project details for ${projectId}`);
  };

  const getStatusColor = (status: "on-track" | "at-risk" | "behind"): "success" | "warning" | "error" => {
    switch (status) {
      case "on-track": return "success";
      case "at-risk": return "warning";
      case "behind": return "error";
      default: return "success";
    }
  };

  // Filter projects based on the selected filter
  const filteredProjects = projectFilter === "all" 
    ? projects 
    : projects.filter(project => 
        projectFilter === "issues" 
          ? project.hasIssues 
          : project.status === projectFilter
      );

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects Overview</h2>
        <div className="flex space-x-2">
          <Button 
            variant={projectFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setProjectFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={projectFilter === "issues" ? "default" : "outline"} 
            size="sm"
            onClick={() => setProjectFilter("issues")}
          >
            With Issues
          </Button>
          <Button 
            variant={projectFilter === "at-risk" ? "default" : "outline"} 
            size="sm"
            onClick={() => setProjectFilter("at-risk")}
          >
            At Risk
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleProjectClick(project.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <StatusIndicator 
                  status={getStatusColor(project.status)} 
                  label={project.status.replace("-", " ")}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Velocity:</span> 
                    <span className="ml-1 font-medium">{project.velocity} pts/sprint</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="ml-1 font-medium">
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {project.hasIssues && (
                  <div className="flex items-center text-red-600 bg-red-50 p-2 rounded text-sm">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Blockers require attention</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="ml-auto">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProjectPortfolioTab;
