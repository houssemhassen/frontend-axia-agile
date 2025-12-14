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

// Map legacy roles if API sends old role names
export const mapLegacyRole = (role: string): UserRole => {
  const roleMap: Record<string, UserRole> = {
    "Administrateur": "Administrateur",
    "superadmin": "SuperAdmin",
    "billingAdmin": "BillingAdmin",
    "productOwner": "ProductOwner",
    "scrumMaster": "ScrumMaster",
    "developer": "Developer",
    "projectManager": "ProjectManager",
    "tester": "Developer", // legacy mapping
  };
  return roleMap[role] || "Developer";
};


export interface Role {
  id: number;
  name: string;
}
