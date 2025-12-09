
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import Reports from "@/pages/Reports";
import KanbanBoard from "@/pages/KanbanBoard";

export const ReportRoutes = [
  <Route 
    key="reports" 
    path="reports" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner", "scrumMaster"]}>
        <Reports />
      </RoleRoute>
    }
  />,
  <Route 
    key="kanban" 
    path="kanban" 
    element={
      <RoleRoute requiredRole={["productOwner", "scrumMaster", "developer", "tester"]}>
        <KanbanBoard />
      </RoleRoute>
    }
  />,
];
