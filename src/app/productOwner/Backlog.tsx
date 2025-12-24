import { useState } from "react";
import { Helmet } from "react-helmet-async";
import BacklogHeader from "@/components/backlog/BacklogHeader";
import BacklogTable from "@/components/backlog/BacklogTable";
import BacklogSummary from "@/components/backlog/BacklogSummary";
import AddBacklogItemDialog from "@/components/backlog/AddBacklogItemDialog";
import EditBacklogItemDialog from "@/components/backlog/EditBacklogItemDialog";

const Backlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemType, setNewItemType] = useState("story");
  const [newItemPriority, setNewItemPriority] = useState("medium");
  const [quickAddMode, setQuickAddMode] = useState(false);
  const [quickAddInput, setQuickAddInput] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Temporary state for backlog items - will be replaced with API call
  const [backlogItems, setBacklogItems] = useState([]);
  const totalItems = backlogItems.length;

  // Filter backlog items based on filters
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const handlePriorityFilterChange = (value) => {
    setPriorityFilter(value);
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  const handleAddItem = () => {
    setIsAddDialogOpen(true);
  };

  const handleItemClick = (itemId) => {
    const item = backlogItems.find(item => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    // TODO: Update item via API
    console.log("Update item:", updatedItem);
  };

  const handleAddNewItem = async () => {
    if (!newItemTitle.trim()) return;

    // TODO: Create item via API
    console.log("Create new item:", {
      title: newItemTitle,
      description: newItemDescription,
      type: newItemType,
      priority: newItemPriority
    });

    setNewItemTitle("");
    setNewItemDescription("");
    setNewItemType("story");
    setNewItemPriority("medium");
    setIsAddDialogOpen(false);
  };

  const handleQuickAdd = async (e) => {
    if (e.key === 'Enter' && quickAddInput.trim() !== '') {
      // TODO: Create item via API
      console.log("Quick add item:", quickAddInput);
      
      setQuickAddInput("");
      setQuickAddMode(false);
    }
  };

  const updateItemsOrder = (result) => {
    // TODO: Update order via API
    console.log("Reorder items:", result);
  };

  return (
    <>
      <Helmet>
        <title>Product Backlog | Axia Agile</title>
        <meta name="description" content="Product Backlog Management" />
      </Helmet>

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
    </>
  );
};

export default Backlog;