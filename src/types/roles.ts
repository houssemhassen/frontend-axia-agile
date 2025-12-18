export type UserRole =
  | "Administrateur"
  | "SuperAdmin"
  | "BillingAdmin"
  | "ProductOwner"
  | "ScrumMaster"
  | "Developer"
  | "ProjectManager";

export const ALL_ROLES: UserRole[] = [
  "Administrateur",
  "SuperAdmin",
  "BillingAdmin",
  "ProductOwner",
  "ScrumMaster",
  "Developer",
  "ProjectManager",
];

/**
 * Map any role string to a standardized UserRole
 * Handles all case variations (camelCase, PascalCase, lowercase, French names, etc.)
 */
export const mapLegacyRole = (role: string | null | undefined): UserRole => {
  if (!role) return "Developer";
  
  // Normalize the input to lowercase for consistent matching
  const normalizedRole = role.toLowerCase().trim();
  
  const roleMap: Record<string, UserRole> = {
    // Administrateur variants
    "administrateur": "Administrateur",
    
    // SuperAdmin variants
    "superadmin": "SuperAdmin",
    "superadministrateur": "SuperAdmin",
    "super_admin": "SuperAdmin",
    "super admin": "SuperAdmin",
    
    // BillingAdmin variants
    "billingadmin": "BillingAdmin",
    "billing_admin": "BillingAdmin",
    "billing admin": "BillingAdmin",
    
    // ProductOwner variants
    "productowner": "ProductOwner",
    "product_owner": "ProductOwner",
    "product owner": "ProductOwner",
    "po": "ProductOwner",
    
    // ScrumMaster variants
    "scrummaster": "ScrumMaster",
    "scrum_master": "ScrumMaster",
    "scrum master": "ScrumMaster",
    "sm": "ScrumMaster",
    
    // Developer variants (including French)
    "developer": "Developer",
    "développeur": "Developer",
    "developpeur": "Developer",
    "dev": "Developer",
    "tester": "Developer", // legacy mapping
    
    // ProjectManager variants (including French)
    "projectmanager": "ProjectManager",
    "project_manager": "ProjectManager",
    "project manager": "ProjectManager",
    "chefdeprojet": "ProjectManager",
    "chef_de_projet": "ProjectManager",
    "chef de projet": "ProjectManager",
    "pm": "ProjectManager",
  };
  
  const mappedRole = roleMap[normalizedRole];
  
  if (!mappedRole) {
    console.warn(`⚠️ Unknown role "${role}" - defaulting to Developer`);
  }
  
  return mappedRole || "Developer";
};

/**
 * Get the route path for a given role
 */
export const getRoleRoute = (role: string | null | undefined): string => {
  const mappedRole = mapLegacyRole(role);
  
  const routeMap: Record<UserRole, string> = {
    "Administrateur": "/admin",
    "SuperAdmin": "/superadmin",
    "BillingAdmin": "/billing",
    "ProductOwner": "/product-owner",
    "ScrumMaster": "/scrum-master",
    "Developer": "/developer",
    "ProjectManager": "/project-manager",
  };
  
  return routeMap[mappedRole] || "/dashboard";
};

export interface Role {
  id: number;
  name: string;
}