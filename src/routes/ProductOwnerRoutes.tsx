import { Route } from "react-router-dom";
import Projects from "@/app/productOwner/Projects";
import DashboardProductOwner from "@/app/productOwner/dashboard";
import ProjectDetails from "@/app/productOwner/ProjectDetails";


export const ProductOwnerRoutes = (
  <>
    <Route path="/product-owner" element={<DashboardProductOwner />} />
    <Route path="/product-owner/projects" element={<Projects />} />
    <Route path="/product-owner/projects/details/:projectId" element={<ProjectDetails />} />
  </>
);