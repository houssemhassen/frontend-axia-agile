
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Bug, 
  CheckCircle2, 
  History, 
  BarChart3, 
  ArrowUpRight,
  Play,
  FileCheck,
  Plus,
  ArrowRight,
  Search,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const QATesterDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Open Bugs",
      value: "12",
      icon: <Bug className="h-5 w-5" />,
      change: "+3 since yesterday",
      trend: "up"
    },
    {
      title: "Test Cases",
      value: "87",
      icon: <FileCheck className="h-5 w-5" />,
      change: "74% passed",
      trend: "neutral"
    },
    {
      title: "Test Coverage",
      value: "68%",
      icon: <BarChart3 className="h-5 w-5" />,
      change: "+5% this sprint",
      trend: "up"
    },
    {
      title: "Features Verified",
      value: "7",
      icon: <CheckCircle2 className="h-5 w-5" />,
      change: "3 remaining",
      trend: "neutral"
    }
  ];

  const reportedBugs = [
    {
      id: "BUG-1024",
      title: "User authentication fails on Safari",
      severity: "High",
      status: "Open",
      assignee: "Dave Chen",
      reportedAt: "Today, 10:23 AM"
    },
    {
      id: "BUG-1023",
      title: "Dashboard charts don't render on mobile",
      severity: "Medium",
      status: "In Progress",
      assignee: "Maria Garcia",
      reportedAt: "Yesterday"
    },
    {
      id: "BUG-1022",
      title: "Payment confirmation email not sending",
      severity: "Critical",
      status: "Open",
      assignee: "Unassigned",
      reportedAt: "Yesterday"
    },
    {
      id: "BUG-1021",
      title: "Image upload fails for large files",
      severity: "Medium",
      status: "In Progress",
      assignee: "Alex Johnson",
      reportedAt: "2 days ago"
    },
  ];

  const testCases = [
    {
      id: "TC-512",
      name: "User Registration Flow",
      type: "Functional",
      status: "Passed",
      lastRun: "Today",
      coverage: 95
    },
    {
      id: "TC-513",
      name: "Payment Processing",
      type: "Integration",
      status: "Failed",
      lastRun: "Today",
      coverage: 60
    },
    {
      id: "TC-514",
      name: "Mobile Responsiveness",
      type: "UI/UX",
      status: "In Progress",
      lastRun: "In Progress",
      coverage: 40
    },
    {
      id: "TC-515",
      name: "API Security Tests",
      type: "Security",
      status: "Passed",
      lastRun: "Yesterday",
      coverage: 85
    },
  ];

  const regressionTests = [
    {
      id: "REG-101",
      name: "Core Functionality Suite",
      status: "Scheduled",
      lastRun: "3 days ago",
      result: "87% Pass",
      duration: "45 minutes"
    },
    {
      id: "REG-102",
      name: "User Interface Tests",
      status: "Completed",
      lastRun: "Yesterday",
      result: "92% Pass",
      duration: "30 minutes"
    },
    {
      id: "REG-103",
      name: "API Endpoint Tests",
      status: "Completed",
      lastRun: "Today",
      result: "100% Pass",
      duration: "15 minutes"
    }
  ];

  const handleReportBug = () => {
    toast.info("Reporting new bug");
  };

  const handleRunTests = () => {
    toast.info("Running test suite");
  };

  const handleCreateTestCase = () => {
    toast.info("Creating new test case");
  };

  const severityColor = (severity: string) => {
    switch(severity) {
      case "Critical": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "High": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Low": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <>
      <Helmet>
        <title>QA Tester Dashboard | Axia Agile</title>
        <meta name="description" content="QA tester dashboard for agile project management" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : stat.trend === "down" ? (
                      <ArrowUpRight className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                    ) : null}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main content */}
          <Tabs defaultValue="bugs" className="w-full">
            <TabsList>
              <TabsTrigger value="bugs">Bug Tracking</TabsTrigger>
              <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
              <TabsTrigger value="regression">Regression Testing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bugs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Reported Bugs</CardTitle>
                    <Button onClick={handleReportBug}>
                      <Plus size={16} className="mr-2" />
                      Report Bug
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportedBugs.map((bug) => (
                        <TableRow key={bug.id}>
                          <TableCell className="font-mono">{bug.id}</TableCell>
                          <TableCell className="font-medium">{bug.title}</TableCell>
                          <TableCell>
                            <Badge className={severityColor(bug.severity)}>
                              {bug.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              bug.status === "Open" ? "destructive" :
                              bug.status === "In Progress" ? "secondary" : 
                              bug.status === "Fixed" ? "outline" : 
                              "default"
                            }>
                              {bug.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{bug.assignee}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Search size={16} className="mr-2" />
                    Search All Bugs
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bug Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <BarChart3 size={120} className="text-muted-foreground/50" />
                  <p className="ml-4 text-muted-foreground">Bug trend chart will render here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="test-cases" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Test Cases</CardTitle>
                    <Button onClick={handleCreateTestCase}>
                      <Plus size={16} className="mr-2" />
                      New Test Case
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Coverage</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testCases.map((testCase) => (
                        <TableRow key={testCase.id}>
                          <TableCell className="font-mono">{testCase.id}</TableCell>
                          <TableCell className="font-medium">{testCase.name}</TableCell>
                          <TableCell>{testCase.type}</TableCell>
                          <TableCell>
                            <Badge variant={
                              testCase.status === "Passed" ? "default" :
                              testCase.status === "Failed" ? "destructive" : 
                              "secondary"
                            }>
                              {testCase.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={testCase.coverage} className="h-2 w-20" />
                              <span className="text-sm">{testCase.coverage}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Run</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleRunTests}>
                    <Play size={16} className="mr-2" />
                    Run All Tests
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="regression" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regression Test Suites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {regressionTests.map((test) => (
                      <div key={test.id} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="font-mono text-sm text-muted-foreground mr-2">{test.id}</span>
                              <span className="font-medium">{test.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <span>Last run: {test.lastRun}</span>
                              <span className="mx-2">•</span>
                              <span>Duration: {test.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              test.status === "Completed" ? "default" :
                              test.status === "Scheduled" ? "secondary" : 
                              "outline"
                            }>
                              {test.status}
                            </Badge>
                            <Badge variant="outline">{test.result}</Badge>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm">View Results</Button>
                          <Button size="sm">Run Suite</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex flex-col md:flex-row gap-2">
                    <Button variant="outline" className="flex-1">
                      Schedule Daily Runs
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Configure Notifications
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regression Test History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Full Regression Suite</p>
                          <p className="text-sm text-muted-foreground">Yesterday, 9:30 AM</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">92% Pass</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Critical Paths Test</p>
                          <p className="text-sm text-muted-foreground">3 days ago, 2:15 PM</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">100% Pass</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">User Registration Flow</p>
                          <p className="text-sm text-muted-foreground">5 days ago, 11:05 AM</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">75% Pass</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                  onClick={handleReportBug}
                >
                  <Bug size={24} />
                  <span>Report Bug</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                  onClick={handleRunTests}
                >
                  <Play size={24} />
                  <span>Run Tests</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                  onClick={handleCreateTestCase}
                >
                  <FileCheck size={24} />
                  <span>Create Test Case</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                >
                  <History size={24} />
                  <span>Test History</span>
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </>
  );
};

export default QATesterDashboard;
