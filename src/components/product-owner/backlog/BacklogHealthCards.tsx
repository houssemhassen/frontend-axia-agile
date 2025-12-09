
import React from 'react';
import { Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BacklogHealthCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Backlog Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Properly Estimated</span>
              <span className="font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span>Clear Acceptance Criteria</span>
              <span className="font-medium">72%</span>
            </div>
            <Progress value={72} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span>Prioritized by Value</span>
              <span className="font-medium">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg flex items-center bg-red-50">
              <Trash2 className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <p className="font-medium">3 high-priority items blocked</p>
                <p className="text-sm text-muted-foreground">Technical dependencies unresolved</p>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg flex items-center bg-yellow-50">
              <Trash2 className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="font-medium">5 items missing acceptance criteria</p>
                <p className="text-sm text-muted-foreground">Stakeholder input needed</p>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg flex items-center bg-blue-50">
              <Trash2 className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <p className="font-medium">Refinement session needed</p>
                <p className="text-sm text-muted-foreground">Schedule for upcoming sprint planning</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacklogHealthCards;
