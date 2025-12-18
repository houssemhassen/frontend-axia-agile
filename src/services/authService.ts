import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName: string;
  bio?: string;
  createdAt: string;
  lastLogin?: string;
  phoneNumber?: string | null;
  profilePicture?: string | null;
  status?: string;
  role?: string; // Some components use 'role' instead of 'roleName'
}

export interface LoginResponse {
  user: User;
  message: string;
  token: string;
}

export interface SocialLoginParams {
  provider: 'google' | 'github';
  code: string;
  redirectUri: string;
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Restore user from localStorage on startup
    this.syncFromLocalStorage();
  }

  /**
   * Sync internal state from localStorage
   */
  private syncFromLocalStorage(): void {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        
        // Ensure localStorage userRole is in sync with the user object
        if (this.currentUser?.roleName) {
          const storedRole = localStorage.getItem("userRole");
          if (storedRole !== this.currentUser.roleName) {
            console.log("🔄 AuthService: Syncing userRole with user data");
            localStorage.setItem("userRole", this.currentUser.roleName);
          }
        }
      } catch (e) {
        console.error("Error parsing saved user:", e);
        this.currentUser = null;
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", credentials);

      // Normalize user object - ensure both 'role' and 'roleName' are set
      const user: User = {
        ...data.user,
        role: data.user.roleName, // Add 'role' alias for compatibility
      };

      // Save to memory and localStorage
      this.currentUser = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", user.roleName);
      
      console.log("✅ Login successful, role set to:", user.roleName);

      return user;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    }
  }

  async socialLogin(params: SocialLoginParams): Promise<{ user: User & { roles: string[] } }> {
    try {
      const { data } = await api.post("/auth/social", params);
      
      const user = {
        ...data.user,
        role: data.user.roleName,
        roles: [data.user.roleName], // For compatibility with components expecting roles array
      };

      this.currentUser = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", user.roleName);

      return { user };
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Social login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore logout API errors
    }
    
    this.currentUser = null;
    
    // Clear ALL auth-related localStorage items
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userRoleDisplay");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("originalUserRole");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    console.log("✅ Logout complete, all auth data cleared");
  }

  getCurrentUser(): User | null {
    // Always re-sync from localStorage in case it was updated elsewhere
    if (!this.currentUser) {
      this.syncFromLocalStorage();
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token") && !!this.getCurrentUser();
  }

  /**
   * Check if the current user has a specific permission
   * This is a simplified implementation - expand based on your permission system
   */
  hasPermission(resource: string, action: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Super admin has all permissions
    const normalizedRole = user.roleName?.toLowerCase();
    if (normalizedRole === 'superadmin' || normalizedRole === 'superadministrateur') {
      return true;
    }
    
    // Define role-based permissions
    const rolePermissions: Record<string, string[]> = {
      'productowner': [
        'projects:read', 'projects:write', 'projects:create',
        'backlog:read', 'backlog:write', 'backlog:create',
        'sprints:read',
        'users:read',
      ],
      'scrummaster': [
        'projects:read',
        'sprints:read', 'sprints:write', 'sprints:create',
        'teams:read', 'teams:write',
        'users:read',
      ],
      'developer': [
        'projects:read',
        'sprints:read',
        'tasks:read', 'tasks:write',
        'code:read', 'code:write',
      ],
      'billingadmin': [
        'billing:read', 'billing:write',
        'users:read',
      ],
    };
    
    const permissions = rolePermissions[normalizedRole] || [];
    const permissionKey = `${resource}:${action}`;
    
    return permissions.includes(permissionKey);
  }

  /**
   * Get the current user's role, normalized to lowercase
   */
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.roleName?.toLowerCase() || null;
  }

  async refresh(): Promise<User | null> {
    try {
      const { data } = await api.post<LoginResponse>("/auth/refresh");

      const user: User = {
        ...data.user,
        role: data.user.roleName,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", user.roleName);

      this.currentUser = user;
      return user;
    } catch (err) {
      console.error("Token refresh failed:", err);
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();