
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import RoleManagement from "@/pages/RoleManagement";
import Activity from "@/pages/Activity";
import Billing from "@/pages/Billing";
import DashboardAdmin from "@/app/admin/dashboard";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import { User } from "lucide-react";
import UserManagement from "@/app/admin/UserManagement";
import ProjectManagement from "@/app/admin/ProjectManagement";

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
    key="project-management"
    path="project-management"
    element={
      <AdminLayout roles="Administrateur">
        <ProjectManagement />
      </AdminLayout>
    }
  />]