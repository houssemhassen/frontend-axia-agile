
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import SprintPlanning from "@/pages/SprintPlanning";
import BurndownReports from "@/pages/BurndownReports";
import Sprints from "@/pages/Sprints";

export const SprintRoutes = [
  <Route 
    key="sprint-planning" 
    path="/sprint-planning" 
    element={
      <RoleRoute requiredRole={["productOwner", "scrumMaster"]}>
        <SprintPlanning />
      </RoleRoute>
    }
  />,
  <Route 
    key="burndown-reports" 
    path="/burndown-reports" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner", "scrumMaster"]}>
        <BurndownReports />
      </RoleRoute>
    }
  />,
  <Route 
    key="sprints" 
    path="/sprints" 
    element={
      <RoleRoute requiredRole={["productOwner", "scrumMaster"]}>
        <Sprints />
      </RoleRoute>
    }
  />,
];
