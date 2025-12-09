
import React from 'react';
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Business Value Delivered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">85%</span>
            <span className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +12% from previous quarter
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">14.2 days</span>
            <span className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1 rotate-180" />
              -2.5 days improvement
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Features Released</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">24</span>
            <span className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +8 from previous quarter
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Value/Effort Ratio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">1.7</span>
            <span className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +0.2 from previous quarter
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
