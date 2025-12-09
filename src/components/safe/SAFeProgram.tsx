
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target, Zap, Calendar } from "lucide-react";

interface SAFeProgramProps {
  projectData?: any;
}

interface Team {
  id: string;
  name: string;
  type: "development" | "platform" | "shared";
  members: number;
  velocity: number;
  currentPI: string;
}

interface Epic {
  id: string;
  title: string;
  status: "planned" | "in-progress" | "completed";
  businessValue: number;
  effort: number;
  teams: string[];
}

const SAFeProgram = ({ projectData }: SAFeProgramProps) => {
  const [teams] = useState<Team[]>([
    {
      id: "team1",
      name: "Customer Experience Team",
      type: "development",
      members: 8,
      velocity: 45,
      currentPI: "PI 2025.1"
    },
    {
      id: "team2", 
      name: "Platform Services Team",
      type: "platform",
      members: 6,
      velocity: 35,
      currentPI: "PI 2025.1"
    },
    {
      id: "team3",
      name: "Data Analytics Team", 
      type: "development",
      members: 7,
      velocity: 40,
      currentPI: "PI 2025.1"
    }
  ]);

  const [epics] = useState<Epic[]>([
    {
      id: "epic1",
      title: "Customer Onboarding Redesign",
      status: "in-progress",
      businessValue: 8,
      effort: 13,
      teams: ["team1", "team2"]
    },
    {
      id: "epic2",
      title: "Advanced Analytics Dashboard",
      status: "planned", 
      businessValue: 9,
      effort: 21,
      teams: ["team3", "team2"]
    },
    {
      id: "epic3",
      title: "Mobile App Enhancement",
      status: "completed",
      businessValue: 7,
      effort: 8,
      teams: ["team1"]
    }
  ]);

  const getTeamTypeColor = (type: string) => {
    switch (type) {
      case "development":
        return "bg-blue-500";
      case "platform":
        return "bg-green-500";
      case "shared":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEpicStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "planned":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">SAFe Program Management</h2>
        <p className="text-muted-foreground">Scaled Agile Framework for enterprise-level coordination</p>
        {projectData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{projectData.name}</h3>
            <p className="text-sm text-muted-foreground">{projectData.description}</p>
            <Badge className="mt-2">Program Increment: PI 2025.1</Badge>
          </div>
        )}
      </div>

      <Tabs defaultValue="program-board" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="program-board">Program Board</TabsTrigger>
          <TabsTrigger value="teams">Agile Teams</TabsTrigger>
          <TabsTrigger value="epics">Epics</TabsTrigger>
          <TabsTrigger value="pi-planning">PI Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="program-board" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Program Board Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Agile Teams</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-muted-foreground">Features in Progress</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-muted-foreground">PI Objectives Met</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Current Program Increment (PI 2025.1)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sprint Progress</span>
                    <span>Sprint 3 of 5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Upcoming Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>System Demo</span>
                          <span className="text-muted-foreground">Feb 15</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Innovation Day</span>
                          <span className="text-muted-foreground">Feb 22</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PI Planning</span>
                          <span className="text-muted-foreground">Mar 1</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Program Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-amber-500 text-amber-500">Medium</Badge>
                          <span>API Integration Delays</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-red-500 text-red-500">High</Badge>
                          <span>Resource Constraints</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <div>
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {team.members} members • {team.currentPI}
                        </p>
                      </div>
                    </div>
                    <Badge className={getTeamTypeColor(team.type)}>
                      {team.type.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Team Velocity</div>
                      <div className="text-2xl font-bold">{team.velocity}</div>
                      <div className="text-xs text-muted-foreground">story points/PI</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current Sprint</div>
                      <div className="text-lg font-semibold">Sprint 3</div>
                      <div className="text-xs text-muted-foreground">Week 2 of 2</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">PI Objectives</div>
                      <div className="text-lg font-semibold text-green-600">85%</div>
                      <div className="text-xs text-muted-foreground">on track</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm">View Backlog</Button>
                    <Button size="sm" variant="outline">Team Board</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="epics" className="space-y-4">
          <div className="grid gap-4">
            {epics.map((epic) => (
              <Card key={epic.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{epic.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Business Value: {epic.businessValue}/10 • Effort: {epic.effort} points
                      </p>
                    </div>
                    <Badge className={getEpicStatusColor(epic.status)}>
                      {epic.status.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Assigned Teams</div>
                      <div className="flex gap-2">
                        {epic.teams.map((teamId) => {
                          const team = teams.find(t => t.id === teamId);
                          return team ? (
                            <Badge key={teamId} variant="outline">
                              {team.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Value vs Effort</div>
                        <div className="text-lg font-semibold">
                          {(epic.businessValue / epic.effort * 10).toFixed(1)} ratio
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Priority Score</div>
                        <div className="text-lg font-semibold text-blue-600">
                          {epic.businessValue * 2 - epic.effort}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm">View Features</Button>
                      <Button size="sm" variant="outline">Edit Epic</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pi-planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Program Increment Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 border-2 border-dashed rounded-lg">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Next PI Planning Event</h3>
                  <p className="text-muted-foreground mb-4">March 1-2, 2025</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-left">
                      <div className="font-medium">Day 1</div>
                      <div className="text-sm text-muted-foreground">Vision & Context</div>
                      <div className="text-sm text-muted-foreground">Team Planning</div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Day 2</div>
                      <div className="text-sm text-muted-foreground">Plan Review</div>
                      <div className="text-sm text-muted-foreground">Confidence Vote</div>
                    </div>
                  </div>
                  <Button className="mt-4">Prepare for PI Planning</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">PI Objectives (Current)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Improve Customer Experience</span>
                          <Badge className="bg-green-500">85%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Modernization</span>
                          <Badge className="bg-blue-500">70%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Data Analytics Enhancement</span>
                          <Badge className="bg-amber-500">60%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Capacity Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Team Capacity</span>
                          <span>840 points</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Committed Work</span>
                          <span>714 points</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capacity Utilization</span>
                          <Badge className="bg-green-500">85%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SAFeProgram;
