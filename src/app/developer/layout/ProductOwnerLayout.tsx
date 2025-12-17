import DashboardLayout from "@/components/layout/DashboardLayout";
import { ReactNode } from "react";

interface DeveloperLayoutProps {
  children: ReactNode;
}

const DeveloperLayout = ({ children }: DeveloperLayoutProps) => {
  return (
    <DashboardLayout role="developer">
      {children}
    </DashboardLayout>
  );
};

export default DeveloperLayout;