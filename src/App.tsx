import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useMemo } from "react";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AuthRoutes } from "./routes/AuthRoutes";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { ProjectManagementRoutes } from "./routes/ProjectManagementRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { SprintRoutes } from "./routes/SprintRoutes";
import { TeamRoutes } from "./routes/TeamRoutes";
import { ReportRoutes } from "./routes/ReportRoutes";
import { DeveloperRoutes } from "./routes/DeveloperRoutes";

import DashboardLayout from "./components/layout/DashboardLayout";
import { ProductOwnerRoutes } from "./routes/ProductOwnerRoutes";
import { authService } from "@/services/authService";

const queryClient = new QueryClient();

// Function to normalize roles to consistent camelCase format
const normalizeRole = (inputRole: string | null | undefined): string => {
  if (!inputRole || inputRole.startsWith('/')) return "";
  
  // Convert to lowercase for matching
  const lowerRole = inputRole.toLowerCase();
  
  const roleMap: { [key: string]: string } = {
    'productowner': 'productOwner',
    'scrummaster': 'scrumMaster',
    'superadmin': 'superadmin',
    'superadministrateur': 'superadmin',
    'developer': 'developer',
    'développeur': 'developer',
    'developpeur': 'developer',
    'billingadmin': 'billingAdmin',
    'administrateur': 'superadmin',
    'projectmanager': 'projectManager',
    'chefdeprojet': 'projectManager',
  };
  
  return roleMap[lowerRole] || inputRole;
};

// Get the correct role from the user object, with localStorage as fallback
const getAuthenticatedUserRole = (): string => {
  // Priority 1: Get role from the actual user object (most reliable)
  const currentUser = authService.getCurrentUser();
  if (currentUser?.roleName) {
    const normalizedRole = normalizeRole(currentUser.roleName);
    // Sync localStorage with the correct role from user object
    const storedRole = localStorage.getItem("userRole");
    if (storedRole !== currentUser.roleName) {
      console.log("🔄 Syncing localStorage role with user data:", currentUser.roleName);
      localStorage.setItem("userRole", currentUser.roleName);
    }
    return normalizedRole;
  }
  
  // Priority 2: Fall back to localStorage (may be stale)
  const storedRole = localStorage.getItem("userRole");
  if (storedRole && !storedRole.startsWith('/')) {
    return normalizeRole(storedRole);
  }
  
  // No authenticated user - return empty (will redirect to login)
  return "";
};

// Map roles to their dashboard routes
const ROLE_ROUTE_MAP: { [key: string]: string } = {
  'productOwner': '/product-owner',
  'superadmin': '/superadmin',
  'developer': '/developer',
  'scrumMaster': '/scrum-master',
  'billingAdmin': '/billing',
  'projectManager': '/project-manager',
};

const RoleBasedRedirect = () => {
  const userRole = getAuthenticatedUserRole();
  
  if (!userRole) {
    // Not authenticated, redirect to home/login
    return <Navigate to="/" replace />;
  }
  
  const targetRoute = ROLE_ROUTE_MAP[userRole] || '/superadmin';
  console.log("🔀 RoleBasedRedirect: Redirecting", userRole, "to", targetRoute);
  return <Navigate to={targetRoute} replace />;
};

const DashboardWrapper = () => {
  const location = useLocation();
  
  // Get the ACTUAL user role (synced from user object)
  const userRole = getAuthenticatedUserRole();
  
  // If no authenticated user, redirect to home
  if (!userRole) {
    console.log("⚠️ No authenticated user, redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  const allowedBasePath = ROLE_ROUTE_MAP[userRole];
  
  // Get all role-specific paths that this user should NOT access
  const unauthorizedPaths = Object.entries(ROLE_ROUTE_MAP)
    .filter(([role, _]) => role !== userRole)
    .map(([_, path]) => path);
  
  // Check if user is trying to access an unauthorized role-specific route
  const isUnauthorized = unauthorizedPaths.some(unauthorizedPath =>
    location.pathname.startsWith(unauthorizedPath)
  );
  
  // Redirect if accessing unauthorized route
  if (isUnauthorized && allowedBasePath) {
    console.log(`🚫 ACCESS DENIED: Redirecting ${userRole} from ${location.pathname} to ${allowedBasePath}`);
    return <Navigate to={allowedBasePath} replace />;
  }
  
  // Special handling for /projects route
  if (location.pathname === '/projects') {
    if (userRole === 'productOwner') {
      console.log("🔀 Redirecting /projects to /product-owner/projects");
      return <Navigate to="/product-owner/projects" replace />;
    }
    // For other roles, redirect to their dashboard
    if (allowedBasePath) {
      console.log(`🔀 Redirecting /projects to ${allowedBasePath}`);
      return <Navigate to={allowedBasePath} replace />;
    }
  }

  return (
    <DashboardLayout role={userRole}>
      <Outlet />
    </DashboardLayout>
  );
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Debug logging
    const user = authService.getCurrentUser();
    const storedRole = localStorage.getItem("userRole");
    
    // Auto-sync: If user is logged in but localStorage role doesn't match, fix it
    if (user?.roleName && storedRole !== user.roleName) {
      console.log("⚠️ Role mismatch detected! Fixing localStorage...");
      localStorage.setItem("userRole", user.roleName);
    }
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" closeButton={true} />

          <Routes>
            <Route path="/" element={<Home />} />
            {AuthRoutes}

            <Route path="/" element={<DashboardWrapper />}>
              {DashboardRoutes}
              {AdminRoutes}
              {ProductOwnerRoutes}
              {SprintRoutes}
              {TeamRoutes}
              {ReportRoutes}
              {ProjectManagementRoutes}
              {DeveloperRoutes}
            </Route>

            <Route path="/redirect" element={<RoleBasedRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;