import { Navigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { UserRole, mapLegacyRole } from "@/types/roles";

type RoleRouteProps = {
  requiredRole: UserRole | UserRole[];
  children: JSX.Element;
};

const RoleRoute = ({ requiredRole, children }: RoleRouteProps) => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser || !authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = mapLegacyRole(currentUser.roleName);
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (requiredRoles.includes(userRole)) {
    return children;
  }

  // Redirect based on user role
  const redirectMap: Record<UserRole, string> = {
    Administrateur: "/admin",
    SuperAdmin: "/superadmin",
    BillingAdmin: "/billing",
    ProductOwner: "/product-owner",
    ScrumMaster: "/scrum-master",
    Developer: "/developer",
    ProjectManager: "/project-manager",
  };

  return <Navigate to={redirectMap[userRole] || "/dashboard"} replace />;
};

export default RoleRoute;