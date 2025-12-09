
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyTasksTab from "@/components/developer/MyTasksTab";
import PullRequestsTab from "@/components/developer/PullRequestsTab";
import CodeTab from "@/components/developer/CodeTab";
import { useDeveloperTasks } from "@/hooks/useDeveloperTasks";
import { usePullRequests } from "@/hooks/usePullRequests";
import { useCommits } from "@/hooks/useCommits";

const DashboardTabs = () => {
  const { tasks } = useDeveloperTasks();
  const { pullRequests } = usePullRequests();
  const { commits } = useCommits();

  return (
    <Tabs defaultValue="tasks" className="w-full">
      <TabsList>
        <TabsTrigger value="tasks">My Tasks</TabsTrigger>
        <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
        <TabsTrigger value="code">Code & Commits</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tasks" className="space-y-6">
        <MyTasksTab tasks={tasks} />
      </TabsContent>
      
      <TabsContent value="pull-requests" className="space-y-6">
        <PullRequestsTab pullRequests={pullRequests} />
      </TabsContent>
      
      <TabsContent value="code" className="space-y-6">
        <CodeTab commits={commits} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
