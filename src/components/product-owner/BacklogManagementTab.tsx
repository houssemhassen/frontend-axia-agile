import React, { useState } from 'react';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BacklogItemType } from '@/types/backlog';
import BacklogListView from './backlog/BacklogListView';
import BacklogHealthCards from './backlog/BacklogHealthCards';
import UserStoryMap from "./UserStoryMap";
import { Dialog } from "@/components/ui/dialog";
import AddBacklogItemForm from './backlog/AddBacklogItemForm';
import { useBacklogItems } from '@/hooks/useBacklogItems';

const BacklogManagementTab = () => {
  const [activeView, setActiveView] = useState("list");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BacklogItemType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Use our custom hook for backlog management
  const { 
    items: backlogItems,
    updateItemPriority,
    assignItem,
    deleteItem,
    updateItem
  } = useBacklogItems();

  // Define styling for priority badges
  const priorityColors = {
    highest: "bg-red-100 text-red-800 hover:bg-red-100",
    high: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    lowest: "bg-gray-100 text-gray-800 hover:bg-gray-100"
  };

  // Define styling for status badges
  const statusColors = {
    unassigned: "bg-gray-100 text-gray-800",
    assigned: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800"
  };

  const handleAddBacklogItem = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const item = backlogItems.find(item => item.id === id);
    if (item) {
      setSelectedItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const handleChangePriority = (id: string, priority: BacklogItemType['priority']) => {
    updateItemPriority(id, priority);
  };

  const handleAssign = (id: string, user: string) => {
    assignItem(id, user || undefined);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    deleteItem(id);
  };

  const handleSaveItem = (updatedItem: BacklogItemType) => {
    updateItem(updatedItem);
    setIsEditDialogOpen(false);
  };

  // Import the refactored dialog component dynamically to keep this file smaller
  const EditBacklogItemDialog = React.lazy(() => import('../backlog/EditBacklogItemDialog'));

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Backlog</h2>
        <Button onClick={handleAddBacklogItem}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Story
        </Button>
      </div>
      
      <Tabs defaultValue="list" value={activeView} onValueChange={setActiveView}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Story Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <BacklogListView
            backlogItems={backlogItems}
            priorityColors={priorityColors}
            statusColors={statusColors}
            onEditItem={handleEditItem}
            onChangePriority={handleChangePriority}
            onAssign={handleAssign}
            onDelete={handleDelete}
          />
        </TabsContent>
        
        <TabsContent value="map">
          <UserStoryMap />
        </TabsContent>
      </Tabs>
      
      <BacklogHealthCards />

      {/* Add Dialog */}
      <AddBacklogItemForm 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      {/* Edit Dialog */}
      <React.Suspense fallback={<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}>
        {selectedItem && (
          <EditBacklogItemDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            item={selectedItem}
            onSave={handleSaveItem}
          />
        )}
      </React.Suspense>
    </>
  );
};

export default BacklogManagementTab;
