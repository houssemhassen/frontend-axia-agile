import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import WidgetGrid from "@/components/widgets/WidgetGrid";
import { useRoleWidgets } from "@/hooks/useRoleWidgets";
import ProjectPortfolioTab from "@/components/product-owner/ProjectPortfolioTab";
import BacklogManagementTab from "@/components/product-owner/BacklogManagementTab";
import ValueDeliveryTab from "@/components/product-owner/ValueDeliveryTab";
import ReleasePlanningTab from "@/components/product-owner/ReleasePlanningTab";

const ProductOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [projectFilter, setProjectFilter] = useState("all");
  const widgets = useRoleWidgets("productOwner");
  
  return (
    <>
      <Helmet>
        <title>Product Owner Dashboard | Axia Agile</title>
        <meta name="description" content="Product Owner dashboard for backlog management and value delivery tracking" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">
          {/* Product Owner Widgets */}
          <WidgetGrid widgets={widgets} columns={4} />

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="portfolio" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="portfolio">Project Portfolio</TabsTrigger>
              <TabsTrigger value="backlog">Backlog Management</TabsTrigger>
              <TabsTrigger value="valueDelivery">Value Delivery</TabsTrigger>
              <TabsTrigger value="releasePlanning">Release Planning</TabsTrigger>
            </TabsList>
            
            {/* Project Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <ProjectPortfolioTab 
                projectFilter={projectFilter} 
                setProjectFilter={setProjectFilter} 
              />
            </TabsContent>
            
            {/* Backlog Management Tab */}
            <TabsContent value="backlog" className="space-y-6">
              <BacklogManagementTab />
            </TabsContent>
            
            {/* Value Delivery Tab */}
            <TabsContent value="valueDelivery" className="space-y-6">
              <ValueDeliveryTab />
            </TabsContent>
            
            {/* Release Planning Tab */}
            <TabsContent value="releasePlanning" className="space-y-6">
              <ReleasePlanningTab />
            </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProductOwnerDashboard;