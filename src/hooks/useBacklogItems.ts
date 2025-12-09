
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { BacklogItemType, BacklogItemCreate, BacklogItemUpdate, BacklogFilters } from '@/types/backlog';
import backlogService from '@/services/backlogService';

interface UseBacklogItemsProps {
  initialFilters?: BacklogFilters;
}

export function useBacklogItems({ initialFilters = {} }: UseBacklogItemsProps = {}) {
  const [items, setItems] = useState<BacklogItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<BacklogFilters>(initialFilters);

  const fetchItems = useCallback(async (filterOptions = filters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await backlogService.getItems(filterOptions);
      setItems(response.items);
      setTotalItems(response.totalCount);
    } catch (err) {
      setError('Error loading backlog items');
      toast.error('Failed to load backlog items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Update filters and fetch new data
  const updateFilters = useCallback((newFilters: BacklogFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchItems(updatedFilters);
  }, [fetchItems, filters]);

  // Create a new backlog item
  const createItem = useCallback(async (item: BacklogItemCreate) => {
    setIsLoading(true);
    try {
      const newItem = await backlogService.createItem(item);
      setItems(prev => [...prev, newItem]);
      setTotalItems(prev => prev + 1);
      toast.success('Backlog item created successfully');
      return newItem;
    } catch (err) {
      setError('Error creating backlog item');
      toast.error('Failed to create backlog item');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an existing backlog item
  const updateItem = useCallback(async (item: BacklogItemUpdate) => {
    setIsLoading(true);
    try {
      const updatedItem = await backlogService.updateItem(item);
      setItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
      toast.success(`Backlog item ${updatedItem.id} updated`);
      return updatedItem;
    } catch (err) {
      setError('Error updating backlog item');
      toast.error('Failed to update backlog item');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a backlog item
  const deleteItem = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await backlogService.deleteItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      setTotalItems(prev => prev - 1);
      toast.success(`Backlog item ${id} deleted`);
      return true;
    } catch (err) {
      setError('Error deleting backlog item');
      toast.error('Failed to delete backlog item');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Change priority of an item
  const updateItemPriority = useCallback(async (id: string, priority: BacklogItemType['priority']) => {
    try {
      const updatedItem = await backlogService.updateItemPriority(id, priority);
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      toast.success(`Priority updated to ${priority}`);
      return updatedItem;
    } catch (err) {
      toast.error('Failed to update priority');
      console.error(err);
      return null;
    }
  }, []);

  // Assign an item to a user
  const assignItem = useCallback(async (id: string, assignee?: string) => {
    try {
      const updatedItem = await backlogService.assignItem(id, assignee);
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      toast.success(assignee ? `Assigned to ${assignee}` : 'Unassigned');
      return updatedItem;
    } catch (err) {
      toast.error('Failed to update assignment');
      console.error(err);
      return null;
    }
  }, []);

  // Handle drag and drop reordering
  const updateItemsOrder = useCallback(async (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;

    // Create a new array from items
    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(destinationIndex, 0, reorderedItem);
    
    // Update the order property
    const itemsWithNewOrder = updatedItems.map((item, index) => ({
      ...item,
      order: index
    }));
    
    // Update the local state immediately for UI responsiveness
    setItems(itemsWithNewOrder);
    
    // Send the update to the server
    try {
      await backlogService.updateItemsOrder(
        itemsWithNewOrder.map((item, index) => ({ id: item.id, order: index }))
      );
      toast.success("Backlog priority updated");
    } catch (err) {
      toast.error('Failed to update item order');
      console.error(err);
      // Revert to the previous state if the API call fails
      fetchItems();
    }
  }, [items, fetchItems]);

  // Fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    totalItems,
    isLoading,
    error,
    filters,
    updateFilters,
    createItem,
    updateItem,
    deleteItem,
    updateItemPriority,
    assignItem,
    updateItemsOrder,
    fetchItems
  };
}
