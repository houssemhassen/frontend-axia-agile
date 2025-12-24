import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Plus,
  ListTodo,
  Calendar,
  FileText,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { UseBacklogManagement } from "@/hooks/UseBacklogManagement";
import { AddUserStoryDialog } from "@/components/product-owner/userStory/AddUserStoryDialog";

const BacklogDetails = () => {
  const { projectId, backlogId } = useParams<{ projectId: string; backlogId: string }>();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { useBacklogById } = UseBacklogManagement();

  // Fetch backlog details using the hook
  const {
    data: backlog,
    isLoading,
    isError,
    error,
    refetch: refetchBacklog
  } = useBacklogById(backlogId ? Number(backlogId) : null);

  const handleGoBack = () => {
    navigate(`/projects/${projectId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
      case "Critical":
        return "border-red-500 text-red-500";
      case "Medium":
        return "border-amber-500 text-amber-500";
      case "Low":
        return "border-green-500 text-green-500";
      default:
        return "border-slate-500 text-slate-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "InProgress":
        return "bg-blue-500";
      case "Blocked":
        return "bg-red-500";
      case "Pending":
        return "bg-slate-500";
      default:
        return "bg-slate-500";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Backlog</h2>
        <p className="text-muted-foreground mb-6">
          {error?.message || "Failed to load backlog details"}
        </p>
        <Button onClick={handleGoBack}>Return to Project</Button>
      </div>
    );
  }

  if (!backlog) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Backlog Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested backlog could not be found.</p>
        <Button onClick={handleGoBack}>Return to Project</Button>
      </div>
    );
  }

  const userStories = backlog.UserStories || [];

  return (
    <>
      <Helmet>
        <title>{backlog.Nom} | Backlog Details</title>
      </Helmet>

      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleGoBack}>
              <ArrowLeft size={18} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{backlog.Nom}</h1>
              <p className="text-sm text-muted-foreground">
                Created on {formatDate(backlog.DateCreation)}
              </p>
            </div>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User Story
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total User Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                {userStories.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {userStories.filter((us: any) => us.Status === "Completed").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userStories.reduce((sum: number, us: any) => sum + (us.points || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Stories List */}
        <Card>
          <CardHeader>
            <CardTitle>User Stories</CardTitle>
          </CardHeader>
          <CardContent>
            {userStories.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">
                  No user stories yet. Click "Add User Story" to create one.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First User Story
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {userStories.map((userStory: any) => (
                  <div
                    key={userStory.Id}
                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{userStory.Title}</h4>
                          <Badge className={getStatusColor(userStory.Status)}>
                            {userStory.Status}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(userStory.Priority)}>
                            {userStory.Priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {userStory.Description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(userStory.CreatedAt)}
                          </span>
                          <span>Points: {userStory.points || 0}</span>
                          <span>Comments: {userStory.CommentCount || 0}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // TODO: Navigate to user story details
                          console.log("View user story:", userStory.Id);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add User Story Dialog */}
      <AddUserStoryDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        projectId={Number(projectId)}
        backlogId={Number(backlogId)}
        onSuccess={() => {
          refetchBacklog(); // Refetch backlog to get updated user stories
          toast.success("User story added successfully!");
        }}
      />
    </>
  );
};

export default BacklogDetails;