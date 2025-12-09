/**
 * Backend API Types and Interfaces
 * Matches the backend microservices architecture
 */

// Standard API Response Format
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message?: string;
  errors?: string[] | null;
  timestamp: string;
}

// User and Auth Types - aligned with existing authService
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // Single role as string to match existing UserData
  roles: string[]; // Array of roles for backend compatibility
  isApproved: boolean;
  isEmailConfirmed: boolean;
  organizationId?: string;
  teamIds?: string[];
  status: 'pending' | 'approved' | 'suspended';
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  expiresAt?: string;
  errors?: string[];
  requiresMFA?: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  errors?: string[];
  requiresApproval?: boolean;
}

// Project and Workspace Types
export interface Workspace {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProjectStatistics {
  totalWorkItems: number;
  completedWorkItems: number;
  inProgressWorkItems: number;
  totalStoryPoints: number;
  completedStoryPoints: number;
  teamCount: number;
  activeSprintCount: number;
}

export interface Project {
  id: number;
  workspaceId: number;
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Completed' | 'OnHold';
  startDate: string;
  endDate?: string;
  createdById: string;
  createdAt: string;
  updatedAt?: string;
  statistics?: ProjectStatistics;
}

// Work Item Types
export interface AcceptanceCriteria {
  id: number;
  workItemId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  order: number;
  createdAt: string;
}

export interface WorkItem {
  id: number;
  projectId: number;
  title: string;
  description: string;
  type: 'Epic' | 'UserStory' | 'Task' | 'Bug' | 'Spike';
  status: 'New' | 'InProgress' | 'Testing' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assigneeId?: string;
  assigneeName?: string;
  reporterId: string;
  reporterName?: string;
  storyPoints?: number;
  sprintId?: number;
  parentId?: number;
  tags?: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
  acceptanceCriteria?: AcceptanceCriteria[];
}

// Sprint Types
export interface Sprint {
  id: number;
  projectId: number;
  name: string;
  goal: string;
  status: 'Planning' | 'Active' | 'Completed' | 'Cancelled';
  startDate: string;
  endDate: string;
  capacity?: number;
  velocity?: number;
  createdById: string;
  createdAt: string;
  updatedAt?: string;
  workItems?: WorkItem[];
}

// Team Types
export interface TeamMember {
  userId: string;
  teamId: string;
  role: 'Member' | 'Lead' | 'ScrumMaster';
  joinedAt: string;
  user?: User;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  leaderId?: string;
  leaderName?: string;
  memberCount: number;
  createdAt: string;
  updatedAt?: string;
  members?: TeamMember[];
}

// Notification Types
export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  categories: string[];
  quietHours?: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export interface Notification {
  id: number;
  userId: string;
  subject: string;
  body: string;
  type: string;
  priority: 'Low' | 'Normal' | 'High' | 'Critical';
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: string;
  readAt?: string;
}

// Billing Types (BillingAdmin only)
export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
}

export interface Subscription {
  id: number;
  organizationId: string;
  planId: number;
  status: 'Active' | 'Cancelled' | 'Expired' | 'PastDue';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  plan: SubscriptionPlan;
}

export interface Invoice {
  id: number;
  organizationId: string;
  subscriptionId: number;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Cancelled';
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

// Analytics and Reports Types
export interface DashboardData {
  projectCount: number;
  activeSprintCount: number;
  totalWorkItems: number;
  completedWorkItems: number;
  teamVelocity: number;
  burndownData: BurndownPoint[];
  recentActivity: ActivityItem[];
}

export interface BurndownPoint {
  date: string;
  planned: number;
  actual: number;
}

export interface ActivityItem {
  id: number;
  type: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface VelocityData {
  sprintId: number;
  sprintName: string;
  plannedPoints: number;
  completedPoints: number;
  velocity: number;
  sprintEndDate: string;
}

// Integration Types
export interface IntegrationType {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  configurationSchema: Record<string, any>;
  isActive: boolean;
}

export interface Integration {
  id: number;
  name: string;
  typeId: number;
  projectId?: number;
  organizationId: string;
  configuration: Record<string, any>;
  isActive: boolean;
  lastSyncAt?: string;
  createdAt: string;
  type: IntegrationType;
}

// Filter and Query Types
export interface WorkItemFilters {
  projectId?: number;
  assigneeId?: string;
  status?: string;
  type?: string;
  priority?: string;
  sprintId?: number;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}