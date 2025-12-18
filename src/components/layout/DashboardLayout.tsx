import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav, { Role } from "../layout/SideNav";
import { DashboardHeader } from "../dashboard/header/DashboardHeader";
import { Button } from "@/components/ui/button";
import ProjectCreationForm from "../projects/ProjectCreationForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authService } from "@/services/authService";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: Role;
}

const DashboardLayout = ({
  children,
  role = "ProductOwner"
}: DashboardLayoutProps) => {
  const [notifications, setNotifications] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [effectiveRole, setEffectiveRole] = useState(role);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // âœ… Get current user from authService
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setUserName(`${user.firstName} ${user.lastName}`);
    } else {
      // Fallback to localStorage if authService doesn't have user
      const userString = localStorage.getItem("currentUser");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          setCurrentUser(user);
          setUserName(`${user.firstName || 'User'} ${user.lastName || 'Account'}`);
        } catch (e) {
          console.error("Error parsing user data:", e);
          setUserName("User Account");
        }
      }
    }

    // ✅ Get role from multiple sources with priority
    // NOTE: Do NOT use location.pathname as role - that's a path, not a role!
    const storedRole = localStorage.getItem("userRole");
    const userRole = user?.roleName;

    // Use props role, stored role, or user role - never the path
    const roleToUse = role || storedRole || userRole || "ProductOwner";
    setEffectiveRole(roleToUse as Role);

    // ✅ Role display names mapping
    const roleNames: Record<string, string> = {
      'superadmin': 'Super Admin',
      'SuperAdmin': 'Super Admin',
      'billingadmin': 'Billing Admin',
      'BillingAdmin': 'Billing Admin',
      'ProductOwner': 'Product Owner',
      'productOwner': 'Product Owner',
      'scrummaster': 'Scrum Master',
      'ScrumMaster': 'Scrum Master',
      'scrumMaster': 'Scrum Master',
      'developer': 'Developer',
      'Developer': 'Developer',
      'projectmanager': 'Project Manager',
      'ProjectManager': 'Project Manager',
      'tester': 'Tester'
    };

    // ✅ Update display role in localStorage
    const displayRole = roleNames[roleToUse] || roleToUse;
    //   localStorage.setItem("userRoleDisplay", displayRole);

  }, [location.pathname, role]);

  // âœ… Get proper role for display
  const getDisplayRole = (): string => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      return currentUser.roleName;
    }
    return localStorage.getItem("userRoleDisplay") || effectiveRole;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - NO className prop */}
        <div className="w-64 bg-white border-r border-gray-200">
          <SideNav role={effectiveRole} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader
            userName={userName}
            role={effectiveRole}
            displayRole={getDisplayRole()}
            notifications={notifications}
            setNotifications={setNotifications}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Button for Quick Project Creation */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span className="text-xl">+</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Project</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProjectCreationForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DashboardLayout;