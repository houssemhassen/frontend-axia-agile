import DashboardLayout from "@/components/layout/DashboardLayout";
import { ReactNode } from "react";

interface SuperAdminLayoutProps {
  children: ReactNode;
}

const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  return (
    <DashboardLayout role="superadmin">
      {children}
    </DashboardLayout>
  );
};

export default SuperAdminLayout;