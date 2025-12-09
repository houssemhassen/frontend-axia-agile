/**
 * Authentication Context Provider
 * Manages user authentication state and provides auth methods
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, LoginResponse, RegisterResponse } from '@/types/api';
import { authService } from '@/services/authService';
import { notificationService } from '@/services/notificationService';
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
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          // Convert authService UserData to our User type
          const user: User = {
            ...currentUser,
            roles: [currentUser.role], // Convert single role to array
            isApproved: currentUser.status === 'approved',
            isEmailConfirmed: true
          };
          setUser(user);
          
          // Start notification service after successful authentication
          await notificationService.start();
        } else {
          // Token might be invalid, clear it
          await authService.logout();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      
      if (response.user) {
        // Convert authService UserData to our User type
        const user: User = {
          ...response.user,
          roles: [response.user.role], // Convert single role to array
          isApproved: response.user.status === 'approved',
          isEmailConfirmed: true // Assume true if login successful
        };
        
        setUser(user);
        
        // Start notification service
        await notificationService.start();
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        return { 
          success: false, 
          errors: ['Login failed'] 
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        errors: error.errors || [error.message || 'Login failed'] 
      };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      // Convert our RegisterData to authService format
      const authServiceData = {
        ...userData,
        role: (userData.role || 'Developer') as any // Cast to avoid type issues with existing authService
      };
      
      const response = await authService.register(authServiceData);
      
      toast.success('Registration successful! Please check your email to verify your account.');
      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        errors: error.errors || [error.message || 'Registration failed'] 
      };
    }
  };

  const logout = async () => {
    try {
      await notificationService.stop();
      await authService.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if logout request fails
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        // Convert authService UserData to our User type
        const user: User = {
          ...currentUser,
          roles: [currentUser.role], // Convert single role to array
          isApproved: currentUser.status === 'approved',
          isEmailConfirmed: true
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, user might need to re-authenticate
      setUser(null);
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    if (!user?.roles) return false;
    return roles.some(role => user.roles.includes(role));
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
    hasRole,
    hasAnyRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};