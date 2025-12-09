import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { authService } from "@/services/authService";

interface UserMenuProps {
  userName: string;
  role: string;
}

export const UserMenu = ({ userName, role }: UserMenuProps) => {
  const navigate = useNavigate();
  const [originalRole] = useState(localStorage.getItem("originalUserRole") || role);
  const isImpersonating = originalRole !== role && originalRole === "superadmin";

  // ✅ Get proper role display from localStorage or current user
  const getCurrentRoleDisplay = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      return currentUser.role;
    }
    return localStorage.getItem("userRoleDisplay") || role;
  };

  const displayRole = getCurrentRoleDisplay();

  const handleProfile = () => {
    navigate("/profile", { state: { role } });
  };

  const handleSettings = () => {
    navigate("/settings", { state: { role } });
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      
      // Clear all auth-related localStorage items
      localStorage.removeItem("userRole");
      localStorage.removeItem("userRoleDisplay");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("originalUserRole");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      
      toast.info("Logging out...");
      setTimeout(() => {
        // Redirect to home page
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear localStorage even if API call fails
      localStorage.clear();
      navigate("/");
    }
  };

  const handleRoleSwitch = (newRole: string) => {
    // Only admins should be able to switch roles
    if (role === "superadmin" || originalRole === "superadmin") {
      // Store the original role if this is the first switch
      if (!localStorage.getItem("originalUserRole")) {
        localStorage.setItem("originalUserRole", role);
      }
      
      // Set the new role
      localStorage.setItem("userRole", newRole.toLowerCase());
      localStorage.setItem("userRoleDisplay", newRole);
      
      toast.info(`Viewing as ${newRole}...`, {
        description: "You are now viewing the application as a different user role."
      });
      
      // Navigate to the appropriate dashboard
      switch (newRole.toLowerCase()) {
        case "superadmin":
          navigate("/superadmin", { state: { role: newRole.toLowerCase() } });
          break;
        case "billingadmin":
          navigate("/billing", { state: { role: newRole.toLowerCase() } });
          break;
        case "productowner":
          navigate("/product-owner", { state: { role: newRole.toLowerCase() } });
          break;
        case "scrummaster":
          navigate("/scrum-master", { state: { role: newRole.toLowerCase() } });
          break;
        case "developer":
          navigate("/developer", { state: { role: newRole.toLowerCase() } });
          break;
        case "projectmanager":
          navigate("/project-manager", { state: { role: newRole.toLowerCase() } });
          break;
        default:
          navigate("/dashboard", { state: { role: newRole.toLowerCase() } });
      }
    }
  };

  const handleResetRole = () => {
    const originalUserRole = localStorage.getItem("originalUserRole");
    if (originalUserRole) {
      localStorage.setItem("userRole", originalUserRole);
      localStorage.setItem("userRoleDisplay", originalUserRole);
      localStorage.removeItem("originalUserRole");
      
      toast.success("Returned to original role", {
        description: "You are now viewing as your original role."
      });
      
      const routeMap: Record<string, string> = {
        "superadmin": "/superadmin",
        "billingadmin": "/billing",
        "productowner": "/product-owner",
        "scrummaster": "/scrum-master",
        "developer": "/developer",
        "projectmanager": "/project-manager"
      };

      const route = routeMap[originalUserRole.toLowerCase()] || "/dashboard";
      navigate(route, { state: { role: originalUserRole } });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="text-sm">
            <div className="font-medium">{userName}</div>
            <div className="text-xs text-muted-foreground">
              {/* ✅ Display proper role case */}
              {displayRole}
              {isImpersonating && <span className="text-warning ml-1">(Viewing as)</span>}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-10 w-10 p-0"
          >
            <User size={18} />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        {/* ✅ Role switching for SuperAdmin */}
        {(role === "superadmin" || originalRole === "superadmin") && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <UserCheck className="mr-2 h-4 w-4" />
                <span>View as Role</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch("SuperAdmin")}
                  className="cursor-pointer"
                >
                  SuperAdmin
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch("ProductOwner")}
                  className="cursor-pointer"
                >
                  Product Owner
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch("ScrumMaster")}
                  className="cursor-pointer"
                >
                  Scrum Master
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch("Developer")}
                  className="cursor-pointer"
                >
                  Developer
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch("ProjectManager")}
                  className="cursor-pointer"
                >
                  Project Manager
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            {isImpersonating && (
              <DropdownMenuItem onClick={handleResetRole} className="cursor-pointer text-orange-600">
                <UserCheck className="mr-2 h-4 w-4" />
                <span>Return to SuperAdmin</span>
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};