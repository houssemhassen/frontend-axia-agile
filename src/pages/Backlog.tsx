
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BacklogHeader from "@/components/backlog/BacklogHeader";
import BacklogTable from "@/components/backlog/BacklogTable";
import BacklogSummary from "@/components/backlog/BacklogSummary";
import AddBacklogItemDialog from "@/components/backlog/AddBacklogItemDialog";
import EditBacklogItemDialog from "@/components/backlog/EditBacklogItemDialog";
import { useBacklogItems } from "@/hooks/useBacklogItems";
import { BacklogItemType } from '@/types/backlog';

const Backlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemType, setNewItemType] = useState<BacklogItemType['type']>("story");
  const [newItemPriority, setNewItemPriority] = useState<BacklogItemType['priority']>("medium");
  const [quickAddMode, setQuickAddMode] = useState(false);
  const [quickAddInput, setQuickAddInput] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BacklogItemType | null>(null);

  // Use our custom hook for backlog items
  const { 
    items: backlogItems, 
    totalItems, 
    updateFilters,
    createItem,
    updateItem,
    updateItemsOrder
  } = useBacklogItems({
    initialFilters: {
      status: statusFilter,
      priority: priorityFilter,
      search: searchTerm
    }
  });

  // Filter backlog items based on filters
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    updateFilters({ status: value });
  };

  const handlePriorityFilterChange = (value: string) => {
    setPriorityFilter(value);
    updateFilters({ priority: value });
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  const handleAddItem = () => {
    setIsAddDialogOpen(true);
  };

  const handleItemClick = (itemId: string) => {
    const item = backlogItems.find(item => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdateItem = async (updatedItem: BacklogItemType) => {
    await updateItem(updatedItem);
  };

  const handleAddNewItem = async () => {
    if (!newItemTitle.trim()) return;

    await createItem({
      title: newItemTitle,
      description: newItemDescription,
      type: newItemType,
      priority: newItemPriority,
      businessValue: 50, // Default values
      effort: 5,
      status: "unassigned", // Add the required status field
      tags: []
    });

    setNewItemTitle("");
    setNewItemDescription("");
    setNewItemType("story");
    setNewItemPriority("medium");
    setIsAddDialogOpen(false);
  };

  const handleQuickAdd = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && quickAddInput.trim() !== '') {
      await createItem({
        title: quickAddInput,
        description: "Added via quick-add",
        type: "story",
        priority: "medium",
        businessValue: 50,
        effort: 3,
        status: "unassigned", // Add the required status field
        tags: []
      });

      setQuickAddInput("");
      setQuickAddMode(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Product Backlog | Axia Agile</title>
        <meta name="description" content="Product Backlog Management" />
      </Helmet>

      <DashboardLayout 
        role="productOwner"
        pageTitle="Product Backlog"
        pageDescription="Organize, prioritize and refine your product backlog"
      >
        <div className="space-y-6">
          <BacklogHeader 
            searchTerm={searchTerm}
            setSearchTerm={handleSearchTermChange}
            statusFilter={statusFilter}
            setStatusFilter={handleStatusFilterChange}
            priorityFilter={priorityFilter}
            setPriorityFilter={handlePriorityFilterChange}
            onAddItem={handleAddItem}
            quickAddMode={quickAddMode}
            setQuickAddMode={setQuickAddMode}
            quickAddInput={quickAddInput}
            setQuickAddInput={setQuickAddInput}
            handleQuickAdd={handleQuickAdd}
          />

          <BacklogTable 
            filteredItems={backlogItems}
            onDragEnd={updateItemsOrder}
            onItemClick={handleItemClick}
            totalItems={totalItems}
          />

          <BacklogSummary backlogItems={backlogItems} />

          <AddBacklogItemDialog 
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            newItemTitle={newItemTitle}
            setNewItemTitle={setNewItemTitle}
            newItemDescription={newItemDescription}
            setNewItemDescription={setNewItemDescription}
            newItemType={newItemType}
            setNewItemType={setNewItemType}
            newItemPriority={newItemPriority}
            setNewItemPriority={setNewItemPriority}
            onAddNewItem={handleAddNewItem}
          />
          
          <EditBacklogItemDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            item={selectedItem}
            onSave={handleUpdateItem}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Backlog;
