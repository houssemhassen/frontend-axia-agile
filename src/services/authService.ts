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

  constructor() {
    // Restaurer user depuis localStorage au démarrage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", credentials);

      // Sauvegarde
      this.currentUser = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.roleName);

      return data.user;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch {}
    this.currentUser = null;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  }

  getCurrentUser(): User | null {
    // Toujours récupérer localStorage si disponible
    const saved = localStorage.getItem("user");
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  async refresh(): Promise<User | null> {
    try {
      const { data } = await api.post<LoginResponse>("/auth/refresh");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.roleName);

      this.currentUser = data.user;
      return data.user;
    } catch (err) {
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
