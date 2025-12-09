
import React from 'react';
import { BarChart3, ListCheck, ArrowDownUp, Filter, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BacklogItemType } from './BacklogTable';

interface BacklogSummaryProps {
  backlogItems: BacklogItemType[];
}

const BacklogSummary: React.FC<BacklogSummaryProps> = ({ backlogItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Backlog Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Items</span>
              <span className="font-medium">{backlogItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unassigned</span>
              <span className="font-medium">{backlogItems.filter(item => item.status === "unassigned").length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blocked</span>
              <span className="font-medium">{backlogItems.filter(item => item.status === "blocked").length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">High Priority</span>
              <span className="font-medium">{backlogItems.filter(item => item.priority === "high" || item.priority === "highest").length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Business Value</span>
              <span className="font-medium">
                {Math.round(backlogItems.reduce((sum, item) => sum + item.businessValue, 0) / backlogItems.length)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-60 flex items-center justify-center">
          <BarChart3 size={80} className="text-muted-foreground/50" />
          <p className="ml-4 text-muted-foreground">Priority distribution chart will render here</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backlog Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <ListCheck size={16} className="mr-2" />
              Groom Backlog
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ArrowDownUp size={16} className="mr-2" />
              Prioritize Items
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Filter size={16} className="mr-2" />
              Apply Bulk Tags
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Save size={16} className="mr-2" />
              Save Current Priority
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacklogSummary;
