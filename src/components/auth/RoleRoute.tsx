
import { Navigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { UserRole } from "@/services/api";

type RoleRouteProps = {
  requiredRole: string | string[];
  children: JSX.Element;
};

// Legacy role mapping for backward compatibility
const mapLegacyRole = (role: string): UserRole => {
  const roleMap: Record<string, UserRole> = {
    'superadmin': 'SuperAdmin',
    'billingAdmin': 'BillingAdmin',
    'productOwner': 'ProductOwner',
    'scrumMaster': 'ScrumMaster',
    'developer': 'Developer',
    'projectManager': 'ProjectManager',
    'tester': 'Developer' // Map legacy tester to Developer for now
  };
  
  return roleMap[role] || 'Developer';
};

const RoleRoute = ({ requiredRole, children }: RoleRouteProps) => {
  const currentUser = authService.getCurrentUser();
  
  if (!currentUser || !authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = currentUser.roles[0];
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  // Map legacy role strings to new UserRole enum
  const mappedRequiredRoles = requiredRoles.map(mapLegacyRole);
  
  // SuperAdmin has access to everything EXCEPT billing
  if (userRole === 'SuperAdmin') {
    const hasBillingRequirement = requiredRoles.some(role => 
      role === 'billingAdmin' || mapLegacyRole(role) === 'BillingAdmin'
    );
    
    if (!hasBillingRequirement) {
      return children;
    }
  }
  
  // BillingAdmin can ONLY access billing
  if (userRole === 'BillingAdmin') {
    const hasBillingRequirement = requiredRoles.some(role => 
      role === 'billingAdmin' || mapLegacyRole(role) === 'BillingAdmin'
    );
    
    if (hasBillingRequirement) {
      return children;
    }
  }
  
  // Check if user role matches any required role
  if (mappedRequiredRoles.includes(userRole)) {
    return children;
  }
  
  // Redirect to appropriate dashboard based on user role
  const roleRedirects: Record<UserRole, string> = {
    'SuperAdmin': '/superadmin',
    'BillingAdmin': '/billing', 
    'ProductOwner': '/product-owner',
    'ScrumMaster': '/scrum-master',
    'Developer': '/developer',
    'ProjectManager': '/project-manager'
  };
  
  const redirectPath = roleRedirects[userRole] || '/dashboard';
  return <Navigate to={redirectPath} replace />;
};

export default RoleRoute;
