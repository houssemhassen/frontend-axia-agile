import { Route } from "react-router-dom";
import Projects from "@/app/productOwner/Projects";
import DashboardProductOwner from "@/app/productOwner/dashboard";


export const ProductOwnerRoutes = (
  <>
    <Route path="/product-owner" element={<DashboardProductOwner />} />
    <Route path="/product-owner/projects" element={<Projects />} />
  </>
);