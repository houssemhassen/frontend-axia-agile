import { BacklogItemType, BacklogItemCreate, BacklogItemUpdate, BacklogResponse, BacklogFilters } from '@/types/backlog';

// Mock data for development - will be replaced with actual API calls
const mockBacklogItems: BacklogItemType[] = [
  {
    id: "BL-1001",
    title: "User authentication with social login",
    description: "Add ability to sign in with Google and Facebook accounts",
    type: "story",
    priority: "high",
    businessValue: 90,
    effort: 5,
    status: "assigned",
    assignee: "Dave Chen",
    createdAt: "2025-04-15",
    tags: ["security", "authentication"],
    order: 0
  },
  {
    id: "BL-1002",
    title: "Product recommendation engine",
    description: "Implement machine learning based product recommendations",
    type: "story",
    priority: "highest",
    businessValue: 95,
    effort: 8,
    status: "unassigned",
    createdAt: "2025-04-12",
    tags: ["ml", "core-feature"],
    order: 1
  },
  // More items can be added here
];

// Service centralisé pour les appels API
const backlogService = {
  // Get all backlog items with filtering options
  getItems: async (filters?: BacklogFilters): Promise<BacklogResponse> => {
    // TODO: Implémenter l'appel API
    // GET /api/backlog-items?status=X&priority=Y&search=Z
    // Retourne: { items: BacklogItem[], totalCount: number }
    
    // Simulation de la logique de filtrage
    let filteredItems = [...mockBacklogItems];
    
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredItems = filteredItems.filter(item => item.status === filters.status);
      }
      
      if (filters.priority && filters.priority !== 'all') {
        filteredItems = filteredItems.filter(item => item.priority === filters.priority);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.title.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Code temporaire pour simulation
    return { 
      items: filteredItems,
      totalCount: mockBacklogItems.length
    };
  },
  
  // Get a specific backlog item by ID
  getItemById: async (id: string): Promise<BacklogItemType | null> => {
    // TODO: Implémenter l'appel API
    // GET /api/backlog-items/{id}
    
    const item = mockBacklogItems.find(item => item.id === id);
    return item || null;
  },
  
  // Create a new backlog item
  createItem: async (item: BacklogItemCreate): Promise<BacklogItemType> => {
    // TODO: Implémenter l'appel API
    // POST /api/backlog-items
    // Corps: item
    // Retourne: { id: string, ...item }
    
    // Code temporaire pour simulation
    const newItem: BacklogItemType = {
      id: `BL-${1000 + mockBacklogItems.length + 1}`,
      ...item,
      createdAt: new Date().toISOString().split('T')[0],
      order: mockBacklogItems.length
    };
    
    mockBacklogItems.push(newItem);
    return newItem;
  },
  
  // Update an existing backlog item
  updateItem: async (itemUpdate: BacklogItemUpdate): Promise<BacklogItemType> => {
    // TODO: Implémenter l'appel API
    // PUT /api/backlog-items/{id}
    // Corps: itemUpdate
    // Retourne: Updated item
    
    // Code temporaire pour simulation
    const index = mockBacklogItems.findIndex(item => item.id === itemUpdate.id);
    
    if (index === -1) {
      throw new Error(`Item with id ${itemUpdate.id} not found`);
    }
    
    const updatedItem = {
      ...mockBacklogItems[index],
      ...itemUpdate
    };
    
    mockBacklogItems[index] = updatedItem;
    return updatedItem;
  },
  
  // Delete a backlog item
  deleteItem: async (id: string): Promise<void> => {
    // TODO: Implémenter l'appel API
    // DELETE /api/backlog-items/{id}
    
    // Code temporaire pour simulation
    const index = mockBacklogItems.findIndex(item => item.id === id);
    
    if (index !== -1) {
      mockBacklogItems.splice(index, 1);
    }
  },
  
  // Change item priority
  updateItemPriority: async (id: string, priority: BacklogItemType['priority']): Promise<BacklogItemType> => {
    // TODO: Implémenter l'appel API
    // PATCH /api/backlog-items/{id}/priority
    // Corps: { priority }
    
    return backlogService.updateItem({ id, priority });
  },
  
  // Assign item to a user
  assignItem: async (id: string, assignee?: string): Promise<BacklogItemType> => {
    // TODO: Implémenter l'appel API
    // PATCH /api/backlog-items/{id}/assign
    // Corps: { assignee }
    
    const status = assignee ? "assigned" : "unassigned";
    return backlogService.updateItem({ id, assignee, status });
  },
  
  // Update item order (for drag-and-drop reordering)
  updateItemsOrder: async (items: { id: string; order: number }[]): Promise<void> => {
    // TODO: Implémenter l'appel API
    // PATCH /api/backlog-items/order
    // Corps: { items: [{ id, order }, ...] }
    
    // Code temporaire pour simulation
    for (const { id, order } of items) {
      const index = mockBacklogItems.findIndex(item => item.id === id);
      if (index !== -1) {
        mockBacklogItems[index].order = order;
      }
    }
  }
};

export default backlogService;
