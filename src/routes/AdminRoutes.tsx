
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import RoleManagement from "@/pages/RoleManagement";
import Activity from "@/pages/Activity";
import Billing from "@/pages/Billing";

export const AdminRoutes = [
  <Route 
    key="role-management" 
    path="role-management" 
    element={
      <RoleRoute requiredRole="superadmin">
        <RoleManagement />
      </RoleRoute>
    }
  />,
  <Route 
    key="activity" 
    path="activity" 
    element={
      <RoleRoute requiredRole={["superadmin", "productOwner"]}>
        <Activity />
      </RoleRoute>
    }
  />,
  <Route 
    key="billing" 
    path="billing" 
    element={
      <RoleRoute requiredRole="billingAdmin">
        <Billing />
      </RoleRoute>
    }
  />
];
