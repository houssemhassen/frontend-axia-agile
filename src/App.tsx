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

const queryClient = new QueryClient();

const RoleBasedRedirect = () => {
  const userRole = localStorage.getItem("userRole") || "superadmin";

  if (!userRole) return <Navigate to="/" replace />;

  switch (userRole) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "superadmin":
      return <Navigate to="/superadmin" replace />;
    case "billingAdmin":
      return <Navigate to="/billing" replace />;
    case "productOwner":
      return <Navigate to="/product-owner" replace />;
    case "scrumMaster":
      return <Navigate to="/scrum-master" replace />;
    case "developer":
      return <Navigate to="/developer" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

const DashboardWrapper = () => {
  const userRole = localStorage.getItem("userRole") || "superadmin";
  console.log("User Role in DashboardWrapper:", userRole);

  return (
    <DashboardLayout role={userRole as any}>
      <Outlet />
    </DashboardLayout>
  );
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("userRole");

    console.log("USER CONNECTED:", user ? JSON.parse(user) : "No user");
    console.log("ROLE:", role);
    console.log("ROUTE:", location.pathname);
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
