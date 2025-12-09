
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Calendar,
  ChevronDown
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ValueDeliveryTab from "@/components/value-metrics/ValueDeliveryTab";
import TimeToMarketTab from "@/components/value-metrics/TimeToMarketTab";
import ValueEffortTab from "@/components/value-metrics/ValueEffortTab";
import PrioritiesTab from "@/components/value-metrics/PrioritiesTab";
import MetricsOverview from "@/components/value-metrics/MetricsOverview";

const ValueMetrics = () => {
  const [selectedProject, setSelectedProject] = useState("all");
  const [timeRange, setTimeRange] = useState("quarter");

  return (
    <>
      <Helmet>
        <title>Value Metrics | Axia Agile</title>
        <meta name="description" content="Value delivery metrics and business outcomes tracking" />
      </Helmet>

      <DashboardLayout 
        role="productOwner"
        pageTitle="Value Metrics"
        pageDescription="Track value delivery and business outcomes across your product portfolio"
      >
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce Platform</SelectItem>
                  <SelectItem value="banking">Mobile Banking App</SelectItem>
                  <SelectItem value="portal">Customer Portal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          <MetricsOverview />

          <Tabs defaultValue="valueDelivery" className="w-full">
            <TabsList>
              <TabsTrigger value="valueDelivery">Value Delivery</TabsTrigger>
              <TabsTrigger value="timeToMarket">Time to Market</TabsTrigger>
              <TabsTrigger value="valueEffort">Value/Effort Analysis</TabsTrigger>
              <TabsTrigger value="priorities">Priority Distribution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="valueDelivery" className="space-y-6 pt-4">
              <ValueDeliveryTab project={selectedProject} timeRange={timeRange} />
            </TabsContent>
            
            <TabsContent value="timeToMarket" className="space-y-6 pt-4">
              <TimeToMarketTab project={selectedProject} timeRange={timeRange} />
            </TabsContent>
            
            <TabsContent value="valueEffort" className="space-y-6 pt-4">
              <ValueEffortTab project={selectedProject} timeRange={timeRange} />
            </TabsContent>
            
            <TabsContent value="priorities" className="space-y-6 pt-4">
              <PrioritiesTab project={selectedProject} timeRange={timeRange} />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ValueMetrics;
