import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, LoginResponse, RegisterResponse } from '@/types/api';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; errors?: string[] }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; errors?: string[] }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
          setUser(savedUser);
        } else {
          const refreshed = await authService.refresh();
          setUser(refreshed);
        }
      }
    } catch (err) {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const loggedUser = await authService.login(credentials);
      setUser(loggedUser);

      toast.success("Login successful!");
      return { success: true };
    } catch (err: any) {
      return { success: false, errors: [err.message] };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    toast.success("Logged out successfully");
  };

  const refreshUser = async () => {
    const refreshed = await authService.refresh();
    setUser(refreshed);
  };

  const hasRole = (role: string): boolean => {
    return user?.roleName === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.includes(user?.roleName || "");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register: () => Promise.resolve({ success: true }), // optionnel
        logout,
        refreshUser,
        hasRole,
        hasAnyRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
