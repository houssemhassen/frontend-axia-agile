
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import ProjectCreation from "@/pages/ProjectCreation";
import WaterfallProject from "@/pages/WaterfallProject";
import SAFeProject from "@/pages/SAFeProject";

export const ProjectManagementRoutes = [
  <Route 
    key="projects" 
    path="/projects" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner"]}>
        <Projects />
      </RoleRoute>
    }
  />,
  <Route 
    key="projects/:projectId" 
    path="/projects/:projectId" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner", "scrumMaster"]}>
        <ProjectDetails />
      </RoleRoute>
    }
  />,
  <Route 
    key="project-creation" 
    path="/project-creation" 
    element={
      <RoleRoute requiredRole="admin">
        <ProjectCreation />
      </RoleRoute>
    }
  />,
  <Route 
    key="waterfall-project" 
    path="/waterfall-project" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner", "projectManager"]}>
        <WaterfallProject />
      </RoleRoute>
    }
  />,
  <Route 
    key="safe-project" 
    path="/safe-project" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner", "projectManager"]}>
        <SAFeProject />
      </RoleRoute>
    }
  />,
];
