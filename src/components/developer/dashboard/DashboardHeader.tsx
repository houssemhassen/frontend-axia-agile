
import React from "react";
import { Clock, Kanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeveloperActions } from "@/hooks/useDeveloperActions";

const DashboardHeader = () => {
  const { handleViewKanban, handleLogTime } = useDeveloperActions();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Developer Dashboard</h1>
        <p className="text-muted-foreground">
          Current Sprint: Mobile App v2.0 - Week 2
        </p>
      </div>
      <div className="mt-4 flex space-x-3 md:mt-0">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleLogTime}
        >
          <Clock size={16} />
          Log Time
        </Button>
        <Button 
          className="flex items-center gap-2"
          onClick={handleViewKanban}
        >
          <Kanban size={16} />
          Kanban Board
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
