import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import Dashboard from "@/pages/Dashboard";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import BillingAdminDashboard from "@/pages/BillingAdminDashboard";
import ScrumMasterDashboard from "@/pages/ScrumMasterDashboard";
import DeveloperDashboard from "@/pages/DeveloperDashboard";
import ProductOwnerDashboard from "@/pages/ProductOwnerDashboard";
import QATesterDashboard from "@/pages/QATesterDashboard";
import ProjectManagerDashboard from "@/pages/ProjectManagerDashboard";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import Backlog from "@/pages/Backlog";
import ReleasePlanning from "@/pages/ReleasePlanning";
import ValueMetrics from "@/pages/ValueMetrics";

export const DashboardRoutes = [
  <Route 
    key="project-manager" 
    path="project-manager" 
    element={
      <RoleRoute requiredRole="projectManager">
        <ProjectManagerDashboard />
      </RoleRoute>
    }
  />,
  <Route 
    key="superadmin" 
    path="superadmin" 
    element={
      <RoleRoute requiredRole="superadmin">
        <SuperAdminDashboard />
      </RoleRoute>
    } 
  />,
  <Route 
    key="billingadmin" 
    path="billing" 
    element={
        <BillingAdminDashboard />
    } 
  />,
  <Route 
    key="dashboard" 
    path="dashboard" 
    element={
      <RoleRoute requiredRole="productOwner">
        <Dashboard />
      </RoleRoute>
    } 
  />,
  <Route 
    key="product-owner" 
    path="product-owner" 
    element={
      <RoleRoute requiredRole="productOwner">
        <ProductOwnerDashboard />
      </RoleRoute>
    } 
  />,
  <Route 
    key="backlog" 
    path="backlog" 
    element={
      <RoleRoute requiredRole="productOwner">
        <Backlog />
      </RoleRoute>
    } 
  />,
  <Route 
    key="release-planning" 
    path="release-planning" 
    element={
      <RoleRoute requiredRole="productOwner">
        <ReleasePlanning />
      </RoleRoute>
    } 
  />,
  <Route 
    key="value-metrics" 
    path="value-metrics" 
    element={
      <RoleRoute requiredRole="productOwner">
        <ValueMetrics />
      </RoleRoute>
    } 
  />,
  <Route 
    key="scrum-master" 
    path="scrum-master" 
    element={
      <RoleRoute requiredRole="scrumMaster">
        <ScrumMasterDashboard />
      </RoleRoute>
    } 
  />,
  <Route 
    key="developer" 
    path="developer" 
    element={
      <RoleRoute requiredRole="developer">
        <DeveloperDashboard />
      </RoleRoute>
    } 
  />,
  <Route 
    key="qa-tester" 
    path="qa-tester" 
    element={
      <RoleRoute requiredRole="tester">
        <QATesterDashboard />
      </RoleRoute>
    } 
  />,
  <Route 
    key="settings" 
    path="settings" 
    element={
      <RoleRoute requiredRole={["superadmin", "billingAdmin", "productOwner", "scrumMaster", "developer", "tester"]}>
        <Settings />
      </RoleRoute>
    } 
  />,
  <Route 
    key="profile" 
    path="profile" 
    element={
      <RoleRoute requiredRole={["superadmin", "billingAdmin", "productOwner", "scrumMaster", "developer", "tester"]}>
        <Profile />
      </RoleRoute>
    } 
  />
];