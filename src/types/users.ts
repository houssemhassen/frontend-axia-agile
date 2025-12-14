export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  status: string;
  roleName?: string;
  roleId?: number;
  isActive: boolean;
  project?: string;
  createdAt: string;
}