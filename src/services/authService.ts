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
  createdAt: string; // ISO date string
  lastLogin?: string; // ISO date string
  phoneNumber?: string | null;
  profilePicture?: string | null;
}


export interface LoginResponse {
  user: User;
  message: string;
  token: string;
}

class AuthService {
  private currentUser: User | null = null;

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", credentials);
      console.log("Login successful:", data);
      this.currentUser = data.user;
      return data.user;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
      this.currentUser = null;
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  async refresh(): Promise<User | null> {
    try {
      const { data } = await api.post<LoginResponse>("/auth/refresh");
      this.currentUser = data.user;
      return data.user;
    } catch (err) {
      this.currentUser = null;
      return null;
    }
  }
}

export const authService = new AuthService();