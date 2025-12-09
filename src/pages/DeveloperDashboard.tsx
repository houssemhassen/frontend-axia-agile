
import React from "react";
import { Helmet } from "react-helmet-async";
import WidgetGrid from "@/components/widgets/WidgetGrid";
import { useRoleWidgets } from "@/hooks/useRoleWidgets";
import DashboardTabs from "@/components/developer/dashboard/DashboardTabs";
import QuickActions from "@/components/developer/QuickActions";

const DeveloperDashboard = () => {
  const widgets = useRoleWidgets("developer");

  return (
    <>
      <Helmet>
        <title>Developer Dashboard | Axia Agile</title>
        <meta name="description" content="Developer dashboard for agile project management" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">
        {/* Developer Widgets */}
        <WidgetGrid widgets={widgets} columns={4} />

        {/* Main content */}
        <DashboardTabs />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </>
  );
};

export default DeveloperDashboard;
