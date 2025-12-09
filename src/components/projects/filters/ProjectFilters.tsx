
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  onStatusFilter: (status: string) => void;
}

const ProjectFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  onStatusFilter 
}: ProjectFiltersProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-8 h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      <Tabs defaultValue={activeTab} className="mt-2">
        <TabsList>
          <TabsTrigger value="all" onClick={() => onStatusFilter('all')}>All</TabsTrigger>
          <TabsTrigger value="in progress" onClick={() => onStatusFilter('in progress')}>In Progress</TabsTrigger>
          <TabsTrigger value="planning" onClick={() => onStatusFilter('planning')}>Planning</TabsTrigger>
          <TabsTrigger value="completed" onClick={() => onStatusFilter('completed')}>Completed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProjectFilters;
