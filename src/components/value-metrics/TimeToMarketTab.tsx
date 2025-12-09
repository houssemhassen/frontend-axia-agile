
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeToMarketChart from "@/components/charts/TimeToMarketChart";
import PriorityDistributionChart from "@/components/charts/PriorityDistributionChart";

interface TimeToMarketTabProps {
  project: string;
  timeRange: string;
}

const TimeToMarketTab: React.FC<TimeToMarketTabProps> = ({ project, timeRange }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Time to Market Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <TimeToMarketChart />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Time by Priority</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <PriorityDistributionChart 
              title="Delivery Time Distribution" 
              description="Average delivery time by priority level"
              showDetailedTooltips={true}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cycle Time Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <TimeToMarketChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TimeToMarketTab;
