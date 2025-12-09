
import { Route } from "react-router-dom";
import RoleRoute from "@/components/auth/RoleRoute";
import TeamCollaboration from "@/pages/TeamCollaboration";
import Teams from "@/pages/Teams";

export const TeamRoutes = [
  <Route 
    key="team-collaboration" 
    path="/team-collaboration" 
    element={
      <RoleRoute requiredRole={["productOwner", "scrumMaster", "developer"]}>
        <TeamCollaboration />
      </RoleRoute>
    }
  />,
  <Route 
    key="teams" 
    path="/teams" 
    element={
      <RoleRoute requiredRole={["admin", "productOwner", "scrumMaster"]}>
        <Teams />
      </RoleRoute>
    }
  />,
];
