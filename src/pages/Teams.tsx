import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  GitBranch,
  Mail,
  MessageCircle,
  Phone
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<"productOwner">("productOwner");
  const [activeTab, setActiveTab] = useState("teams");

  const teams = [
    {
      id: 1,
      name: "Product Design Team",
      description: "Responsible for UX/UI design across all products",
      members: 8,
      projects: 3,
      lead: {
        name: "Emily Chen",
        avatar: "/placeholder.svg",
        role: "Lead Designer",
        email: "emily.chen@example.com"
      },
      capacity: 85,
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Web Development Team",
      description: "Front-end and back-end development for web applications",
      members: 12,
      projects: 4,
      lead: {
        name: "Marcus Johnson",
        avatar: "/placeholder.svg",
        role: "Lead Developer",
        email: "marcus.j@example.com"
      },
      capacity: 90,
      location: "Remote"
    },
    {
      id: 3,
      name: "Analytics Team",
      description: "Data analytics and business intelligence",
      members: 5,
      projects: 2,
      lead: {
        name: "Sarah Parker",
        avatar: "/placeholder.svg",
        role: "Data Science Lead",
        email: "s.parker@example.com"
      },
      capacity: 75,
      location: "New York, NY"
    },
    {
      id: 4,
      name: "Mobile Development Team",
      description: "Mobile app development for iOS and Android",
      members: 7,
      projects: 2,
      lead: {
        name: "David Kim",
        avatar: "/placeholder.svg",
        role: "Mobile Dev Lead",
        email: "dkim@example.com"
      },
      capacity: 100,
      location: "Remote"
    },
    {
      id: 5,
      name: "QA Team",
      description: "Quality assurance and testing",
      members: 6,
      projects: 5,
      lead: {
        name: "Rachel Lewis",
        avatar: "/placeholder.svg",
        role: "QA Manager",
        email: "r.lewis@example.com"
      },
      capacity: 65,
      location: "Chicago, IL"
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Emily Chen",
      avatar: "/placeholder.svg",
      role: "Lead Designer",
      team: "Product Design Team",
      projects: 3,
      email: "emily.chen@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      availability: "Available"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg",
      role: "Lead Developer",
      team: "Web Development Team",
      projects: 4,
      email: "marcus.j@example.com",
      phone: "+1 (555) 234-5678",
      location: "Remote",
      availability: "In Meeting"
    },
    {
      id: 3,
      name: "Sarah Parker",
      avatar: "/placeholder.svg",
      role: "Data Science Lead",
      team: "Analytics Team",
      projects: 2,
      email: "s.parker@example.com",
      phone: "+1 (555) 345-6789",
      location: "New York, NY",
      availability: "Available"
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg",
      role: "Mobile Dev Lead",
      team: "Mobile Development Team",
      projects: 2,
      email: "dkim@example.com",
      phone: "+1 (555) 456-7890",
      location: "Remote",
      availability: "Away"
    },
    {
      id: 5,
      name: "Rachel Lewis",
      avatar: "/placeholder.svg",
      role: "QA Manager",
      team: "QA Team",
      projects: 5,
      email: "r.lewis@example.com",
      phone: "+1 (555) 567-8901",
      location: "Chicago, IL",
      availability: "Available"
    },
    {
      id: 6,
      name: "Michael Torres",
      avatar: "/placeholder.svg",
      role: "UX Designer",
      team: "Product Design Team",
      projects: 2,
      email: "m.torres@example.com",
      phone: "+1 (555) 678-9012",
      location: "San Francisco, CA",
      availability: "Available"
    },
    {
      id: 7,
      name: "Jessica Wong",
      avatar: "/placeholder.svg",
      role: "Frontend Developer",
      team: "Web Development Team",
      projects: 3,
      email: "j.wong@example.com",
      phone: "+1 (555) 789-0123",
      location: "Remote",
      availability: "In Meeting"
    },
    {
      id: 8,
      name: "Robert Chen",
      avatar: "/placeholder.svg",
      role: "Backend Developer",
      team: "Web Development Team",
      projects: 4,
      email: "r.chen@example.com",
      phone: "+1 (555) 890-1234",
      location: "Remote",
      availability: "Available"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Team Management | Axia Agile</title>
        <meta name="description" content="Manage your agile teams" />
      </Helmet>

      <DashboardLayout role={role}>
        <div className="space-y-8 animate-fade-in">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
              <p className="text-muted-foreground">
                Manage teams and team members across projects
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter
              </Button>
              <Button className="flex items-center gap-2">
                <UserPlus size={16} />
                Add Member
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
            </TabsList>
            
            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-6">
              {/* Search Bar */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Search teams..."
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Teams List */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                  <Card key={team.id} className="animate-scale-in overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{team.name}</CardTitle>
                          <CardDescription className="mt-1 line-clamp-1">{team.description}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={team.lead.avatar} alt={team.lead.name} />
                          <AvatarFallback>{team.lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{team.lead.name}</p>
                          <p className="text-xs text-muted-foreground">{team.lead.role}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground">Team Size</p>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{team.members} members</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Projects</p>
                          <div className="flex items-center gap-1">
                            <GitBranch size={14} />
                            <span>{team.projects} active</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm font-medium">Capacity</p>
                          <p className="text-sm">{team.capacity}%</p>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              team.capacity > 90 ? "bg-red-500" : 
                              team.capacity > 75 ? "bg-amber-500" : 
                              "bg-green-500"
                            }`}
                            style={{ width: `${team.capacity}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">{team.location}</p>
                        <Button variant="ghost" size="sm">View Team</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {/* Add Team Card */}
                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center animate-scale-in">
                  <Button variant="ghost" className="h-full w-full py-12 flex flex-col items-center">
                    <Users size={24} className="mb-2" />
                    <span>Create New Team</span>
                  </Button>
                </Card>
              </div>
            </TabsContent>
            
            {/* Team Members Tab */}
            <TabsContent value="members" className="space-y-6">
              {/* Search Bar */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Search team members..."
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Team Members List */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="animate-scale-in overflow-hidden">
                    <CardContent className="pt-6 pb-4 px-4">
                      <div className="flex flex-col items-center text-center mb-4">
                        <Avatar className="h-16 w-16 mb-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-base">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <Badge 
                          variant="outline" 
                          className={
                            member.availability === "Available" ? "mt-2 text-green-500 border-green-500" : 
                            member.availability === "In Meeting" ? "mt-2 text-amber-500 border-amber-500" : 
                            "mt-2 text-gray-500 border-gray-500"
                          }
                        >
                          {member.availability}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Team:</span>
                          <span>{member.team}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Projects:</span>
                          <span>{member.projects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>{member.location}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between">
                        <Button variant="ghost" size="icon" title="Email">
                          <Mail size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" title="Message">
                          <MessageCircle size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" title="Call">
                          <Phone size={16} />
                        </Button>
                        <Button variant="outline" size="sm">Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {/* Add Member Card */}
                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center animate-scale-in">
                  <Button variant="ghost" className="h-full w-full py-12 flex flex-col items-center">
                    <UserPlus size={24} className="mb-2" />
                    <span>Add Team Member</span>
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Teams;
