import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

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

const queryClient = new QueryClient();

// Fonction pour normaliser les rôles - GARDEZ camelCase
const normalizeRole = (inputRole: string): string => {
  if (!inputRole || inputRole.startsWith('/')) return "";
  
  const roleMap: { [key: string]: string } = {
    'ProductOwner': 'productOwner',
    'productowner': 'productOwner',
    'PRODUCTOWNER': 'productOwner',
    'ScrumMaster': 'scrumMaster',
    'scrummaster': 'scrumMaster',
    'SCRUMMASTER': 'scrumMaster',
    'SuperAdmin': 'superadmin',
    'superadmin': 'superadmin',
    'SUPERADMIN': 'superadmin',
    'Developer': 'developer',
    'developer': 'developer',
    'DEVELOPER': 'developer',
    'BillingAdmin': 'billingAdmin',
    'billingadmin': 'billingAdmin',
    'BILLINGADMIN': 'billingAdmin',
  };
  
  return roleMap[inputRole] || inputRole;
};

const RoleBasedRedirect = () => {
  let userRole = localStorage.getItem("userRole") || "superadmin";
  
  if (userRole.startsWith('/')) {
    console.log("🚨 Cleaning invalid role:", userRole);
    userRole = "superadmin";
    localStorage.setItem("userRole", userRole);
  }
  
  userRole = normalizeRole(userRole) || "superadmin";

  const roleRouteMap: { [key: string]: string } = {
    'superadmin': '/superadmin',
    'billingAdmin': '/billing',
    'productOwner': '/product-owner',
    'scrumMaster': '/scrum-master',
    'developer': '/developer',
  };

  return <Navigate to={roleRouteMap[userRole] || '/superadmin'} replace />;
};

const DashboardWrapper = () => {
  let userRole = localStorage.getItem("userRole");
  const location = useLocation();
  
  console.log("🔍 DashboardWrapper - Raw role from localStorage:", userRole);
  
  if (!userRole || userRole.startsWith('/')) {
    console.log("🚨 Invalid role detected, resetting to superadmin");
    userRole = "superadmin";
    localStorage.setItem("userRole", userRole);
  }
  
  userRole = normalizeRole(userRole) || "superadmin";
  
  console.log("✅ DashboardWrapper - Normalized role:", userRole);
  console.log("📍 Current path:", location.pathname);

  // Map des rôles vers leurs routes autorisées
  const roleRouteMap: { [key: string]: string } = {
    'productOwner': '/product-owner',
    'superadmin': '/superadmin',
    'developer': '/developer',
    'scrumMaster': '/scrum-master',
    'billingAdmin': '/billing',
  };

  const allowedBasePath = roleRouteMap[userRole];
  
  // Liste des routes qui ne correspondent PAS au rôle de l'utilisateur
  const unauthorizedPaths = Object.values(roleRouteMap).filter(
    path => path !== allowedBasePath
  );
  
  // Vérifier si l'utilisateur essaie d'accéder à une route non autorisée
  const isUnauthorized = unauthorizedPaths.some(unauthorizedPath =>
    location.pathname.startsWith(unauthorizedPath)
  );
  
  // Rediriger si accès non autorisé
  if (isUnauthorized && allowedBasePath) {
    console.log(`🚫 ACCESS DENIED: Redirecting ${userRole} from ${location.pathname} to ${allowedBasePath}`);
    return <Navigate to={allowedBasePath} replace />;
  }
  
  // Redirection spéciale pour /projects
  if (location.pathname === '/projects') {
    if (userRole === 'productOwner') {
      console.log("🔀 Redirecting /projects to /product-owner/projects");
      return <Navigate to="/product-owner/projects" replace />;
    }
    // Pour les autres rôles, rediriger vers leur dashboard
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
    const user = localStorage.getItem("user");
    let role = localStorage.getItem("userRole");
    
    if (role && role.startsWith('/')) {
      console.log("🧹 Cleaning invalid role from localStorage:", role);
      localStorage.removeItem("userRole");
      role = null;
    }

    console.log("👤 USER CONNECTED:", user ? JSON.parse(user) : "No user");
    console.log("🎭 ROLE:", role);
    console.log("📍 ROUTE:", location.pathname);
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