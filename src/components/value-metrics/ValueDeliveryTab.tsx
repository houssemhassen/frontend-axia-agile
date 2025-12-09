
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ValueDeliveryChart from "@/components/charts/ValueDeliveryChart";

interface ValueDeliveryTabProps {
  project: string;
  timeRange: string;
}

const ValueDeliveryTab: React.FC<ValueDeliveryTabProps> = ({ project, timeRange }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Feature Value Delivery Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ValueDeliveryChart />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Value Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ValueDeliveryChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Value Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Authentication System</span>
                  <span className="font-medium">95</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Security impact across platform</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Payment Processing</span>
                  <span className="font-medium">92</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Direct revenue impact</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Product Recommendations</span>
                  <span className="font-medium">88</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Cross-selling opportunities</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Mobile Checkout</span>
                  <span className="font-medium">85</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Increased mobile conversion rate</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Customer Profiles</span>
                  <span className="font-medium">80</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Personalization cornerstone</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ValueDeliveryTab;
