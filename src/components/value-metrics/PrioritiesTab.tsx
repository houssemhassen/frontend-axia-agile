
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriorityDistributionChart from "@/components/charts/PriorityDistributionChart";

interface PrioritiesTabProps {
  project: string;
  timeRange: string;
}

const PrioritiesTab: React.FC<PrioritiesTabProps> = ({ project, timeRange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <PriorityDistributionChart showDetailedTooltips={true} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Business Value vs Priority</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <PriorityDistributionChart 
              title="Business Value Distribution" 
              showDetailedTooltips={true}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Priority Alignment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">Well-aligned Priorities</h3>
              <p className="text-sm text-green-700">
                85% of high-priority items have high business value, indicating good alignment between priorities and business value.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
              <h3 className="font-medium text-yellow-800 mb-1">Medium-value Items with High Priority</h3>
              <p className="text-sm text-yellow-700">
                7 items with medium business value have high priority. Consider re-evaluating their priority level.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <h3 className="font-medium text-red-800 mb-1">Misaligned Items</h3>
              <p className="text-sm text-red-700">
                3 low-value items have high priority. These should be reviewed and potentially reprioritized.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-1">Undervalued Items</h3>
              <p className="text-sm text-blue-700">
                5 high-value items have low priority. Consider elevating their importance in the backlog.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PrioritiesTab;
