import SidebarAdmin from "@/components/admin/sidebar";
import RoleRoute from "@/components/auth/RoleRoute";
import { UserRole } from "@/types/roles";

type AdminLayoutProps = {
  children: React.ReactNode;
  roles: UserRole | UserRole[];
};

export default function AdminLayout({ children, roles }: AdminLayoutProps) {
  return (
    <RoleRoute requiredRole={roles}>
      <div className="flex min-h-screen">
        <SidebarAdmin /> {/* Sidebar dynamique selon rôle */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </RoleRoute>
  );
}
