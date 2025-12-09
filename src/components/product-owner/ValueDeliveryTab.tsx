
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ValueDeliveryChart from "@/components/charts/ValueDeliveryChart";
import TimeToMarketChart from "@/components/charts/TimeToMarketChart";
import ValueEffortMatrix from "@/components/charts/ValueEffortMatrix";

interface Feature {
  id: string;
  name: string;
  progress: number;
  deliveryTime: number;
  value: number;
  effort: number;
}

const ValueDeliveryTab = () => {
  const features: Feature[] = [
    {
      id: "F-101",
      name: "User Authentication",
      progress: 80,
      deliveryTime: 14,
      value: 90,
      effort: 60
    },
    {
      id: "F-102",
      name: "Product Catalog",
      progress: 100,
      deliveryTime: 21,
      value: 85,
      effort: 70
    },
    {
      id: "F-103",
      name: "Checkout Process",
      progress: 60,
      deliveryTime: 10,
      value: 95,
      effort: 50
    },
    {
      id: "F-104",
      name: "User Reviews",
      progress: 40,
      deliveryTime: 7,
      value: 70,
      effort: 30
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion</span>
                    <span>{feature.progress}%</span>
                  </div>
                  <progress 
                    value={feature.progress} 
                    max="100" 
                    className="w-full h-2 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Business Value</p>
                    <p className="font-medium">{feature.value}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Effort</p>
                    <p className="font-medium">{feature.effort}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Delivery Time</p>
                    <p className="font-medium">{feature.deliveryTime} days</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Value/Effort</p>
                    <p className="font-medium">{(feature.value / feature.effort).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ValueEffortMatrix />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValueDeliveryChart />
        <TimeToMarketChart />
      </div>
    </>
  );
};

export default ValueDeliveryTab;
