import React from "react";
import DashboardPageWrapper from "@/components/layout/DashboardPageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import WidgetGrid from "@/components/widgets/WidgetGrid";
import { useRoleWidgets } from "@/hooks/useRoleWidgets";

const BillingAdminDashboard = () => {
  const widgets = useRoleWidgets("billingAdmin");

  return (
    <DashboardPageWrapper
      title="Billing Admin Dashboard | Axia Agile"
      description="Billing administration dashboard for subscription and payment management"
    >
      <PageHeader
        title="Billing Dashboard"
        description="Manage subscriptions, payments, and billing analytics"
      />

      {/* Billing Widgets */}
      <WidgetGrid widgets={widgets} columns={4} />
    </DashboardPageWrapper>
  );
};

export default BillingAdminDashboard;