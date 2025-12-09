
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatusIndicator from "@/components/data-display/StatusIndicator";
import PriorityDistributionChart from "@/components/charts/PriorityDistributionChart";

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  capacity: number;
  committed: number;
  status: "planning" | "active" | "completed";
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind";
}

const ReleasePlanningTab = () => {
  const sprints: Sprint[] = [
    {
      id: "S-201",
      name: "Sprint 8",
      startDate: "2025-05-01",
      endDate: "2025-05-14",
      capacity: 50,
      committed: 45,
      status: "active"
    },
    {
      id: "S-202",
      name: "Sprint 9",
      startDate: "2025-05-15",
      endDate: "2025-05-28",
      capacity: 50,
      committed: 0,
      status: "planning"
    },
    {
      id: "S-203",
      name: "Sprint 10",
      startDate: "2025-05-29",
      endDate: "2025-06-11",
      capacity: 50,
      committed: 0,
      status: "planning"
    }
  ];

  const milestones: Milestone[] = [
    {
      id: "M-301",
      name: "Beta Release",
      date: "2025-06-30",
      progress: 65,
      status: "on-track"
    },
    {
      id: "M-302",
      name: "Public Launch",
      date: "2025-08-15",
      progress: 40,
      status: "at-risk"
    },
    {
      id: "M-303",
      name: "Phase 2 Features",
      date: "2025-10-01",
      progress: 25,
      status: "on-track"
    }
  ];

  const getStatusColor = (status: "on-track" | "at-risk" | "behind"): "success" | "warning" | "error" => {
    switch (status) {
      case "on-track": return "success";
      case "at-risk": return "warning";
      case "behind": return "error";
      default: return "success";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sprints.map((sprint) => (
          <Card key={sprint.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{sprint.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Capacity Committed</span>
                    <span>{sprint.committed}/{sprint.capacity} pts</span>
                  </div>
                  <Progress value={(sprint.committed / sprint.capacity) * 100} className="h-2" />
                </div>
                
                <Badge className={sprint.status === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                  {sprint.status === "active" ? "Currently Active" : "In Planning"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{milestone.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Target: {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusIndicator 
                    status={getStatusColor(milestone.status)} 
                    label={milestone.status.replace("-", " ")}
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <PriorityDistributionChart 
            title="Release Priority Distribution" 
            description="Distribution of features by priority level in the upcoming release"
            showDetailedTooltips={true}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ReleasePlanningTab;
