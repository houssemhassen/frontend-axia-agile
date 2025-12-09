/**
 * Base API configuration and utilities
 * Handles JWT token management and API communication
 */

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

// API Gateway configuration (Port 5000) - matches backend architecture
const config: ApiConfig = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.axia-agile.com/api/v1' 
    : 'http://localhost:5000/api/v1',
  timeout: 30000
};

// Token management utilities
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },
  
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },
  
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  
  clearTokens: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  },
  
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
};

// HTTP client with JWT support
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = tokenManager.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add Authorization header if token exists and not expired
    if (token && !tokenManager.isTokenExpired(token)) {
      headers.Authorization = `Bearer ${token}`;
    }

    const requestOptions: RequestInit = {
      ...options,
      headers,
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log('🔍 API Request:', { url, options: requestOptions }) ;

      console.log(tokenManager.getToken());
      console.log('🔍 API Response:', response);
      // Handle token refresh if unauthorized
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry request with new token
          headers.Authorization = `Bearer ${tokenManager.getToken()}`;
          const retryResponse = await fetch(url, { ...requestOptions, headers });
          return this.handleResponse<T>(retryResponse);
        } else {
          // Refresh failed, redirect to login
      //    this.handleAuthFailure();
          throw new Error('Authentication failed');
        }
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      const errorData = isJson 
        ? await response.json()
        : { success: false, message: response.statusText, errors: [response.statusText] };
      
      // Handle standardized backend error format
      const error = new Error(errorData.message || `HTTP ${response.status}`);
      (error as any).errors = errorData.errors || [];
      (error as any).success = false;
      throw error;
    }

    if (isJson) {
      const data = await response.json();
      // Backend returns standardized format: { success, data, message, errors, timestamp }
      // Return the data property directly for easier consumption
      return data.data !== undefined ? data.data : data;
    }

    return response.text() as unknown as T;
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle standardized backend response format
        if (data.success && data.data) {
          const { accessToken, refreshToken: newRefreshToken } = data.data;
          tokenManager.setTokens(accessToken, newRefreshToken);
          return true;
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  private handleAuthFailure(): void {
      console.log('Auth failure detected, tokens cleared');
      
    
   // tokenManager.clearTokens();
   // window.location.href = '/login';
  }

  // HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(config);

// Role and permission types
export type UserRole = 
  | 'SuperAdmin' 
  | 'BillingAdmin' 
  | 'ScrumMaster' 
  | 'ProductOwner' 
  | 'Developer' 
  | 'ProjectManager';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  permissions: Permission[];
  organizationId?: string;
  teamIds?: string[];
  status: 'pending' | 'approved' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: UserData;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  requiresMFA?: boolean;
}