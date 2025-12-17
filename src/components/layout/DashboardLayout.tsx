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
  role?: string;
}

const DashboardLayout = ({
  children,
  role
}: DashboardLayoutProps) => {
  const [notifications, setNotifications] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [effectiveRole, setEffectiveRole] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fonction pour normaliser les rôles
  const normalizeRole = (inputRole: string): string => {
    if (!inputRole) return "";

    if (inputRole.startsWith('/')) {
      console.log("⚠️ Invalid role (route detected):", inputRole);
      return "";
    }

    const roleMap: { [key: string]: string } = {
      'ProductOwner': 'productOwner',
      'productowner': 'productOwner',
      'PRODUCTOWNER': 'productOwner',
      'ScrumMaster': 'scrumMaster',
      'scrummaster': 'scrumMaster',
      'SCRUMMASTER': 'scrumMaster',
      'SuperAdmin': 'superadmin',
      'superadmin': 'superadmin',
      'SUPERADMIN': 'superadmin',
      'Developer': 'developer',
      'developer': 'developer',
      'DEVELOPER': 'developer',
      'BillingAdmin': 'billingAdmin',
      'billingadmin': 'billingAdmin',
      'BILLINGADMIN': 'billingAdmin',
    };

    return roleMap[inputRole] || inputRole; // ✅ Pas de .toLowerCase()
  };

  useEffect(() => {
    // Get current user from authService
    const user = authService.getCurrentUser();
    let userFromStorage = null;

    if (user) {
      console.log("User from authService:", user);
      setCurrentUser(user);
      setUserName(`${user.firstName} ${user.lastName}`);
    } else {
      // Fallback to localStorage if authService doesn't have user
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          userFromStorage = JSON.parse(userString);
          setCurrentUser(userFromStorage);
          setUserName(`${userFromStorage.firstName || 'User'} ${userFromStorage.lastName || 'Account'}`);
        } catch (e) {
          console.error("Error parsing user data:", e);
          setUserName("User Account");
        }
      }
    }

    // ❌ NE JAMAIS utiliser location.pathname comme role
    const storedRole = localStorage.getItem("userRole");

    // Essayer d'obtenir le rôle de l'utilisateur
    let userRoleFromData = null;
    const currentUserData = user || userFromStorage;

    if (currentUserData) {
      userRoleFromData =
        currentUserData.roleName ||
        currentUserData.role ||
        (Array.isArray(currentUserData.roles) ? currentUserData.roles[0] : null);
    }

    const propsRole = role;

    // Priorité : userRoleFromData > storedRole (SI VALIDE) > propsRole
    let rawRole = "";

    if (userRoleFromData) {
      rawRole = userRoleFromData;
    } else if (storedRole && !storedRole.startsWith('/')) {
      rawRole = storedRole;
    } else if (propsRole && !propsRole.startsWith('/')) {
      rawRole = propsRole;
    } else {
      rawRole = "superadmin";
    }

    const normalizedRole = normalizeRole(rawRole);

    console.log("🔍 Role Debug:", {
      storedRole,
      userRoleFromData,
      propsRole,
      rawRole,
      normalizedRole,
      currentPath: location.pathname
    });

    // Ne mettre à jour que si on a un rôle valide
    if (normalizedRole) {
      setEffectiveRole(normalizedRole);

      // Update localStorage ONLY with valid normalized role
      if (normalizedRole !== storedRole) {
        console.log("✅ Updating localStorage with correct role:", normalizedRole);
        localStorage.setItem("userRole", normalizedRole);
      }
    }

  }, [role]); // ✅ NE PAS inclure location dans les dépendances

  // Get proper role for display
  const getDisplayRole = (): string => {
    const roleDisplayNames: Record<string, string> = {
      'superadmin': 'Super Admin',
      'billingAdmin': 'Billing Admin',
      'productOwner': 'Product Owner',
      'scrumMaster': 'Scrum Master',
      'developer': 'Developer',
      'projectManager': 'Project Manager',
      'tester': 'Tester'
    };

    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.roleName) {
      const normalized = normalizeRole(currentUser.roleName);
      return roleDisplayNames[normalized] || currentUser.roleName;
    }

    return roleDisplayNames[effectiveRole] || effectiveRole;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <SideNav role={effectiveRole as Role} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader
            userName={userName}
            role={effectiveRole as Role}
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
    </div>
  );
};

export default DashboardLayout;