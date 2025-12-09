
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ValueEffortMatrix from "@/components/charts/ValueEffortMatrix";

interface ValueEffortTabProps {
  project: string;
  timeRange: string;
}

const ValueEffortTab: React.FC<ValueEffortTabProps> = ({ project, timeRange }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Value/Effort Matrix</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ValueEffortMatrix />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Value ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Email Notifications</span>
                  <span className="font-medium">3.2 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 80, Effort: 25</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Password Reset</span>
                  <span className="font-medium">3.0 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 75, Effort: 25</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Order Tracking</span>
                  <span className="font-medium">2.8 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 85, Effort: 30</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Search Refinements</span>
                  <span className="font-medium">2.7 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 80, Effort: 30</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Shopping Cart</span>
                  <span className="font-medium">2.5 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 90, Effort: 36</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lowest Value ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Admin Dashboard</span>
                  <span className="font-medium">0.9 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 65, Effort: 75</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">CSV Export</span>
                  <span className="font-medium">1.1 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 55, Effort: 50</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Dark Mode</span>
                  <span className="font-medium">1.2 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 60, Effort: 50</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Coupon System</span>
                  <span className="font-medium">1.3 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 75, Effort: 58</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Print Functionality</span>
                  <span className="font-medium">1.4 ROI</span>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Value: 45, Effort: 32</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ValueEffortTab;
