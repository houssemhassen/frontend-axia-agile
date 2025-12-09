/**
 * Protected Route Component
 * Handles authentication checks and role-based access control
 */

import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { UserRole } from '@/services/api';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole | UserRole[];
  requiredPermissions?: Array<{ resource: string; action: string }>;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  requiredRoles,
  requiredPermissions,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuthorization();
  }, [requiredRoles, requiredPermissions]);

  const checkAuthorization = async () => {
    try {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // Check if user is approved
      if (currentUser.status !== 'approved') {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // Check role-based access
      if (requiredRoles) {
        const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        const hasRole = roles.includes(currentUser.role);
        
        if (!hasRole) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }
      }

      // Check permission-based access
      if (requiredPermissions) {
        const hasAllPermissions = requiredPermissions.every(({ resource, action }) =>
          authService.hasPermission(resource, action)
        );
        
        if (!hasAllPermissions) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Authorization check failed:', error);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    // Store attempted location for redirect after login
    const from = location.pathname + location.search;
    
    // Determine redirect path based on current user role
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      // User is authenticated but not authorized for this route
      const roleRedirects: Record<string, string> = {
        'SuperAdmin': '/superadmin',
        'BillingAdmin': '/billing',
        'ProductOwner': '/product-owner',
        'ScrumMaster': '/scrum-master',
        'Developer': '/developer',
        'ProjectManager': '/project-manager'
      };

      const userRedirect = roleRedirects[currentUser.role];
      if (userRedirect && from !== userRedirect) {
        return <Navigate to={userRedirect} replace />;
      }
    }
    
    return <Navigate to={redirectTo} state={{ from }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;