
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  GitBranch, 
  Search, 
  Filter, 
  FileCode, 
  FolderOpen,
  Folder,
  Download,
  GitPullRequest,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommitItem from "@/components/developer/CommitItem";

// Sample data for repository content
const repositoryStructure = [
  { name: "src", type: "folder", lastUpdated: "2 days ago" },
  { name: "components", type: "folder", lastUpdated: "1 day ago" },
  { name: "pages", type: "folder", lastUpdated: "1 day ago" },
  { name: "utils", type: "folder", lastUpdated: "3 days ago" },
  { name: "README.md", type: "file", lastUpdated: "1 week ago" },
  { name: "package.json", type: "file", lastUpdated: "2 weeks ago" },
  { name: ".gitignore", type: "file", lastUpdated: "2 months ago" }
];

// Sample data for commits
const recentCommits = [
  {
    id: "a1b2c3d",
    message: "Fix user authentication error handling",
    branch: "feature/user-auth",
    timestamp: "2 hours ago"
  },
  {
    id: "e5f6g7h",
    message: "Update mobile layout for homepage",
    branch: "fix/mobile-layout",
    timestamp: "4 hours ago"
  },
  {
    id: "i9j0k1l",
    message: "Implement new API endpoints for user data",
    branch: "feature/api-endpoints",
    timestamp: "Yesterday"
  },
  {
    id: "m2n3o4p",
    message: "Add unit tests for auth module",
    branch: "feature/user-auth",
    timestamp: "2 days ago"
  },
  {
    id: "q5r6s7t",
    message: "Refactor database query optimization",
    branch: "master",
    timestamp: "3 days ago"
  }
];

// Sample data for branches
const branches = [
  { name: "master", lastCommit: "3 days ago", author: "Dave Chen" },
  { name: "develop", lastCommit: "1 day ago", author: "Emma Thompson" },
  { name: "feature/user-auth", lastCommit: "2 hours ago", author: "Dave Chen" },
  { name: "fix/mobile-layout", lastCommit: "4 hours ago", author: "Dave Chen" },
  { name: "feature/api-endpoints", lastCommit: "Yesterday", author: "Alex Johnson" }
];

const CodeRepository = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBranch, setCurrentBranch] = useState("master");
  
  const handleBranchChange = (branch: string) => {
    setCurrentBranch(branch);
    toast.info(`Switched to ${branch} branch`);
  };
  
  const handleDownload = () => {
    toast.info("Downloading repository as ZIP");
  };
  
  const filteredStructure = repositoryStructure.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Code Repository | Axia Agile</title>
        <meta name="description" content="Code repository for development projects" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Code Repository</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <GitBranch className="h-4 w-4" /> 
              Current Branch: <span className="font-medium">{currentBranch}</span>
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download size={16} />
              Download
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => toast.info("Creating new pull request")}
            >
              <GitPullRequest size={16} />
              New Pull Request
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - branches */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Branches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {branches.map((branch) => (
                <div 
                  key={branch.name}
                  className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                    currentBranch === branch.name ? 'bg-primary/10 text-primary border border-primary/30' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleBranchChange(branch.name)}
                >
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    <span>{branch.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {branch.lastCommit}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Main content area */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Repository Contents</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search files..."
                      className="w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {filteredStructure.map((item) => (
                    <div 
                      key={item.name}
                      className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {item.type === 'folder' ? (
                          <FolderOpen className="h-4 w-4 text-amber-400" />
                        ) : (
                          <FileCode className="h-4 w-4 text-blue-400" />
                        )}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="commits">
              <TabsList>
                <TabsTrigger value="commits">Recent Commits</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="commits" className="space-y-4 mt-4">
                {recentCommits.map((commit) => (
                  <CommitItem key={commit.id} {...commit} />
                ))}
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      Activity timeline will be implemented in a future update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeRepository;
