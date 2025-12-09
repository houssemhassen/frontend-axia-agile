
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  GripVertical,
  AlertCircle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";

// Types
interface StoryMapItem {
  id: string;
  title: string;
  type: 'epic' | 'feature' | 'story';
  status: 'unassigned' | 'assigned' | 'blocked' | 'in-progress' | 'done';
  children?: StoryMapItem[];
  parentId?: string;
  release?: string;
  sprint?: string;
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  expandable?: boolean;
  expanded?: boolean;
}

const UserStoryMap: React.FC = () => {
  const [releaseFilter, setReleaseFilter] = useState<string>("all");
  const [sprintFilter, setSprintFilter] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "epic-1": true,
    "epic-2": true,
    "epic-3": false,
    "feature-1-1": true,
    "feature-1-2": true,
    "feature-2-1": true,
  });

  // Sample data for the story map
  const [storyMapData, setStoryMapData] = useState<StoryMapItem[]>([
    {
      id: "epic-1",
      title: "User Authentication",
      type: "epic",
      status: "in-progress",
      priority: "highest",
      expandable: true,
      children: [
        {
          id: "feature-1-1",
          title: "Login System",
          type: "feature",
          status: "in-progress",
          priority: "high",
          parentId: "epic-1",
          expandable: true,
          children: [
            {
              id: "story-1-1-1",
              title: "Social login integration",
              type: "story",
              status: "assigned",
              priority: "medium",
              parentId: "feature-1-1",
              release: "Q2 2025",
              sprint: "Sprint 5"
            },
            {
              id: "story-1-1-2",
              title: "Two-factor authentication",
              type: "story",
              status: "blocked",
              priority: "high",
              parentId: "feature-1-1",
              release: "Q2 2025",
              sprint: "Sprint 6"
            }
          ]
        },
        {
          id: "feature-1-2",
          title: "User Profile",
          type: "feature",
          status: "assigned",
          priority: "medium",
          parentId: "epic-1",
          expandable: true,
          children: [
            {
              id: "story-1-2-1",
              title: "Profile editor",
              type: "story",
              status: "unassigned",
              priority: "low",
              parentId: "feature-1-2",
              release: "Q3 2025",
              sprint: "Sprint 7"
            }
          ]
        }
      ]
    },
    {
      id: "epic-2",
      title: "E-commerce Features",
      type: "epic",
      status: "assigned",
      priority: "high",
      expandable: true,
      children: [
        {
          id: "feature-2-1",
          title: "Shopping Cart",
          type: "feature",
          status: "assigned",
          priority: "highest",
          parentId: "epic-2",
          expandable: true,
          children: [
            {
              id: "story-2-1-1",
              title: "Add to cart functionality",
              type: "story",
              status: "in-progress",
              priority: "highest",
              parentId: "feature-2-1",
              release: "Q2 2025",
              sprint: "Sprint 5"
            },
            {
              id: "story-2-1-2",
              title: "Cart persistence",
              type: "story",
              status: "unassigned",
              priority: "high",
              parentId: "feature-2-1",
              release: "Q3 2025",
              sprint: "Sprint 8"
            }
          ]
        }
      ]
    },
    {
      id: "epic-3",
      title: "Analytics Dashboard",
      type: "epic",
      status: "unassigned",
      priority: "medium",
      expandable: true,
      children: [
        {
          id: "feature-3-1",
          title: "User Tracking",
          type: "feature",
          status: "unassigned",
          priority: "low",
          parentId: "epic-3",
          expandable: true,
          children: [
            {
              id: "story-3-1-1",
              title: "Page view analytics",
              type: "story",
              status: "unassigned",
              priority: "low",
              parentId: "feature-3-1",
              release: "Q4 2025",
              sprint: "Sprint 10"
            }
          ]
        }
      ]
    }
  ]);

  // Status styling
  const statusColors: Record<string, string> = {
    unassigned: "bg-gray-100 text-gray-800",
    assigned: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800"
  };

  // Priority styling
  const priorityColors: Record<string, string> = {
    highest: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
    lowest: "bg-gray-100 text-gray-800"
  };

  // Type styling
  const typeClasses: Record<string, string> = {
    epic: "border-l-4 border-purple-500",
    feature: "border-l-4 border-blue-500 ml-4",
    story: "border-l-4 border-green-500 ml-8"
  };

  // Toggle item expanded state
  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Handle drag end
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    // If dropping in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a deep copy of the data
    const newData = [...storyMapData];
    
    // Logic for reordering would go here
    // This is simplified - in a real implementation you'd need to 
    // traverse the tree to find and move the right items
    
    toast.success("Item repositioned successfully");
    // For now, let's just show a toast
    // setStoryMapData(newData); // Would update with the reordered data
  };

  // Filter items based on release and sprint
  const filterItems = (items: StoryMapItem[]): StoryMapItem[] => {
    return items
      .filter(item => {
        // For epics and features, we filter based on children
        if (item.type !== 'story') {
          const filteredChildren = item.children ? filterItems(item.children) : [];
          return filteredChildren.length > 0;
        }
        
        // For stories, we apply the actual filters
        const matchesRelease = releaseFilter === "all" || item.release === releaseFilter;
        const matchesSprint = sprintFilter === "all" || item.sprint === sprintFilter;
        
        return matchesRelease && matchesSprint;
      })
      .map(item => {
        if (item.children) {
          return {
            ...item,
            children: filterItems(item.children)
          };
        }
        return item;
      });
  };

  const filteredData = filterItems(storyMapData);

  // Render a story map item
  const renderItem = (item: StoryMapItem, index: number) => {
    const isExpanded = expandedItems[item.id] ?? false;
    
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`mb-2 ${snapshot.isDragging ? 'opacity-70' : ''}`}
          >
            <div 
              className={`
                p-3 bg-white rounded-md shadow-sm border 
                ${typeClasses[item.type]}
                ${snapshot.isDragging ? 'shadow-md' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span {...provided.dragHandleProps}>
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </span>
                  
                  {item.expandable && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleExpand(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      {isExpanded ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  )}
                  
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={priorityColors[item.priority]}>
                    {item.priority}
                  </Badge>
                  <Badge className={statusColors[item.status]}>
                    {item.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
              
              {/* Show additional info for stories */}
              {item.type === 'story' && (
                <div className="mt-2 pl-6 text-xs text-muted-foreground">
                  {item.release && <span className="mr-2">Release: {item.release}</span>}
                  {item.sprint && <span>Sprint: {item.sprint}</span>}
                </div>
              )}
            </div>
            
            {/* Render children if expanded */}
            {item.children && isExpanded && (
              <div className="mt-1 pl-4 border-l border-dashed border-gray-300 ml-4">
                {item.children.map((child, childIndex) => renderItem(child, childIndex))}
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">User Story Map</h2>
          <p className="text-sm text-muted-foreground">
            Visualize user journeys across epics, features and stories
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="w-40">
            <Select value={releaseFilter} onValueChange={setReleaseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Release" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Releases</SelectItem>
                <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                <SelectItem value="Q3 2025">Q3 2025</SelectItem>
                <SelectItem value="Q4 2025">Q4 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <Select value={sprintFilter} onValueChange={setSprintFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sprints</SelectItem>
                <SelectItem value="Sprint 5">Sprint 5</SelectItem>
                <SelectItem value="Sprint 6">Sprint 6</SelectItem>
                <SelectItem value="Sprint 7">Sprint 7</SelectItem>
                <SelectItem value="Sprint 8">Sprint 8</SelectItem>
                <SelectItem value="Sprint 9">Sprint 9</SelectItem>
                <SelectItem value="Sprint 10">Sprint 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" onClick={() => {
            setReleaseFilter("all");
            setSprintFilter("all");
          }}>
            Reset Filters
          </Button>
          
          <Button variant="outline" onClick={() => {
            const newExpandedState: Record<string, boolean> = {};
            Object.keys(expandedItems).forEach(key => {
              newExpandedState[key] = true;
            });
            setExpandedItems(newExpandedState);
          }}>
            Expand All
          </Button>
          
          <Button variant="outline" onClick={() => {
            const newExpandedState: Record<string, boolean> = {};
            Object.keys(expandedItems).forEach(key => {
              newExpandedState[key] = false;
            });
            setExpandedItems(newExpandedState);
          }}>
            Collapse All
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Story Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 inline-block bg-purple-500 rounded-sm"></span>
              <span>Epic</span>
              <span className="w-3 h-3 inline-block bg-blue-500 rounded-sm ml-4"></span>
              <span>Feature</span>
              <span className="w-3 h-3 inline-block bg-green-500 rounded-sm ml-4"></span>
              <span>Story</span>
            </div>
            Drag items to reorganize • Click the chevron to expand/collapse sections
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="story-map">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="overflow-auto pb-4"
                >
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => renderItem(item, index))
                  ) : (
                    <div className="p-8 text-center border border-dashed rounded-md bg-muted/10">
                      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No items match the current filters</p>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStoryMap;
