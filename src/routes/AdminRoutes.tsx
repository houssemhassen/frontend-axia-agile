
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import RoleManagement from "@/pages/RoleManagement";
import Activity from "@/pages/Activity";
import Billing from "@/pages/Billing";
import DashboardAdmin from "@/app/admin/dashboard";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import { User } from "lucide-react";
import UserManagement from "@/app/admin/UserManagement";

export const AdminRoutes = [
  <Route
    key="admin"
    path="admin"
    element={
      <AdminLayout roles="Administrateur">
        <DashboardAdmin />
      </AdminLayout>
    }
  />,
  <Route
    key="user-management"
    path="user-management"
    element={
      <AdminLayout roles="Administrateur">
        <UserManagement />
      </AdminLayout>
    }
  />,
  <Route
    key="role-management"
    path="role-management"
    element={
      <AdminLayout roles="Administrateur">
        <RoleManagement />
      </AdminLayout>
    }
  />,
  <Route
    key="activity"
    path="activity"
    element={
      <RoleRoute requiredRole={["Administrateur", "productOwner"]}>
        <Activity />
      </RoleRoute>
    }
  />,
  <Route
    key="billing"
    path="billing"
    element={
      <RoleRoute requiredRole="Administrateur">
        <Billing />
      </RoleRoute>
    }
  />
];
