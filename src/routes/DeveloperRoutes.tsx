
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import CodeRepository from "@/pages/CodeRepository";
import PullRequests from "@/pages/PullRequests";
import ReportBug from "@/pages/ReportBug";

export const DeveloperRoutes = [
  <Route 
    key="code" 
    path="code" 
    element={
      <RoleRoute requiredRole={["developer", "scrumMaster"]}>
        <CodeRepository />
      </RoleRoute>
    }
  />,
  <Route 
    key="pull-requests" 
    path="pull-requests" 
    element={
      <RoleRoute requiredRole={["developer", "scrumMaster"]}>
        <PullRequests />
      </RoleRoute>
    }
  />,
  <Route 
    key="report-bug" 
    path="report-bug" 
    element={
      <RoleRoute requiredRole={["developer", "tester", "scrumMaster"]}>
        <ReportBug />
      </RoleRoute>
    }
  />
];
