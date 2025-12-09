/**
 * Authentication Service
 * Handles login, logout, registration, and JWT token management
 */

import { apiClient, tokenManager, UserData, LoginResponse, UserRole } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId?: string;
}

export interface SocialLoginData {
  provider: 'google' | 'github' | 'microsoft' | 'slack';
  code: string;
  redirectUri: string;
}

class AuthService {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      console.log('Attempting login with credentials:', credentials);
      // For demo purposes, we'll handle test accounts locally
      const testAccount = this.getTestAccount(credentials.email, credentials.password);
      if (testAccount) {
        return testAccount;
      }

      // Real API call to AuthService (Port 5001)
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      console.log('Login response:', response);
      // Store tokens
      tokenManager.setTokens(response.accessToken, response.refreshToken);

      // Store user data
      this.setCurrentUser(response.user);

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<{ message: string; requiresApproval: boolean }> {
    try {
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Real API call to AuthService (Port 5001)
      const response = await apiClient.post<{ message: string; requiresApproval: boolean }>('/auth/register', userData);

      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  }

  /**
   * Social login (OAuth)
   */
  async socialLogin(socialData: SocialLoginData): Promise<LoginResponse> {
    try {
      // Real API call to AuthService (Port 5001)
      const response = await apiClient.post<LoginResponse>('/auth/social-login', socialData);

      // Store tokens
      tokenManager.setTokens(response.accessToken, response.refreshToken);

      // Store user data
      this.setCurrentUser(response.user);

      return response;
    } catch (error) {
      console.error('Social login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Social login failed');
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (refreshToken) {
        // Notify server to invalidate refresh token
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      tokenManager.clearTokens();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) return false;

      const response = await apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
        refreshToken
      });

      tokenManager.setTokens(response.accessToken, response.refreshToken);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      tokenManager.clearTokens();
      return false;
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): UserData | null {
    try {
      const userString = localStorage.getItem('currentUser');
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null;
    }
  }

  /**
   * Set current user in localStorage
   */
  private setCurrentUser(user: UserData): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', user.roles[0].toLowerCase());
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = tokenManager.getToken();
    return token !== null && !tokenManager.isTokenExpired(token);
  }

  /**
   * Get user role
   */
  getUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user?.roles[0] || null;
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(resource: string, action: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    return user.permissions.some(permission =>
      permission.resource === resource && permission.actions.includes(action)
    );
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      return await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Forgot password failed');
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      return await apiClient.post<{ message: string }>('/auth/reset-password', {
        token,
        newPassword
      });
    } catch (error) {
      console.error('Reset password failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Reset password failed');
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      return await apiClient.post<{ message: string }>('/auth/verify-email', { token });
    } catch (error) {
      console.error('Email verification failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Email verification failed');
    }
  }

  /**
   * Demo test accounts for development
   */
  private getTestAccount(email: string, password: string): LoginResponse | null {
    if (password !== 'test123') return null;

    const testAccounts: Record<string, { role: UserRole; firstName: string; lastName: string }> = {
      'admin@test.com': { role: 'SuperAdmin', firstName: 'Super', lastName: 'Admin' },
      'billing@test.com': { role: 'BillingAdmin', firstName: 'Billing', lastName: 'Admin' },
      'product@test.com': { role: 'ProductOwner', firstName: 'Product', lastName: 'Owner' },
      'scrum@test.com': { role: 'ScrumMaster', firstName: 'Scrum', lastName: 'Master' },
      'dev@test.com': { role: 'Developer', firstName: 'John', lastName: 'Developer' },
      'pm@test.com': { role: 'ProjectManager', firstName: 'Project', lastName: 'Manager' },
    };

    const account = testAccounts[email.toLowerCase()];
    if (!account) return null;

    // Generate mock JWT tokens
    const now = Math.floor(Date.now() / 1000);
    const accessToken = this.generateMockJWT({
      sub: `test-user-${account.role.toLowerCase()}`,
      email,
      role: account.role,
      exp: now + 3600, // 1 hour
      iat: now
    });

    const refreshToken = this.generateMockJWT({
      sub: `test-user-${account.role.toLowerCase()}`,
      type: 'refresh',
      exp: now + 86400 * 7, // 7 days
      iat: now
    });

    const userData: UserData = {
      id: `test-user-${account.role.toLowerCase()}`,
      email,
      firstName: account.firstName,
      lastName: account.lastName,
      roles: [account.role],
      permissions: this.getRolePermissions(account.role),
      status: 'approved',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    // Store tokens and user data
    tokenManager.setTokens(accessToken, refreshToken);
    this.setCurrentUser(userData);

    return {
      user: userData,
      accessToken,
      refreshToken,
      expiresIn: 3600
    };
  }

  /**
   * Generate mock JWT for testing
   */
  private generateMockJWT(payload: any): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'mock-signature';
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Get role-based permissions
   */
  private getRolePermissions(role: UserRole): Array<{ resource: string; actions: string[] }> {
    const permissions = {
      SuperAdmin: [
        { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'tasks', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'teams', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'integrations', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'workspaces', actions: ['create', 'read', 'update', 'delete'] },
        // Note: SuperAdmin explicitly CANNOT access billing
      ],
      BillingAdmin: [
        { resource: 'billing', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'subscriptions', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'invoices', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'payments', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'usage', actions: ['read'] },
        // Note: BillingAdmin ONLY has access to billing-related resources
      ],
      ScrumMaster: [
        { resource: 'projects', actions: ['read', 'update'] },
        { resource: 'tasks', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'sprints', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'teams', actions: ['read'] },
        { resource: 'reports', actions: ['read'] },
        { resource: 'retrospectives', actions: ['create', 'read', 'update', 'delete'] },
      ],
      ProductOwner: [
        { resource: 'projects', actions: ['create', 'read', 'update'] },
        { resource: 'tasks', actions: ['create', 'read', 'update'] },
        { resource: 'backlog', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'user-stories', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'reports', actions: ['read'] },
        { resource: 'teams', actions: ['read'] },
      ],
      Developer: [
        { resource: 'tasks', actions: ['read', 'update'] },
        { resource: 'time-logs', actions: ['create', 'read', 'update'] },
        { resource: 'attachments', actions: ['create', 'read', 'delete'] },
        { resource: 'personal-metrics', actions: ['read'] },
        { resource: 'pull-requests', actions: ['create', 'read', 'update'] },
      ],
      ProjectManager: [
        { resource: 'projects', actions: ['create', 'read', 'update'] },
        { resource: 'tasks', actions: ['create', 'read', 'update'] },
        { resource: 'teams', actions: ['read', 'update'] },
        { resource: 'resources', actions: ['read', 'update'] },
        { resource: 'reports', actions: ['read'] },
        { resource: 'cross-team-metrics', actions: ['read'] },
        { resource: 'milestones', actions: ['create', 'read', 'update'] },
      ]
    };

    return permissions[role] || [];
  }
}

export const authService = new AuthService();