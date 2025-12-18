
interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  progress?: number;
  productOwner?: string;
  scrumMaster?: string;
  methodology?: string;
  members?: string[];
  team?: string;
  memberCount?: number;
  isStarred?: boolean;
  createdAt?: string;
  updatedAt?: string;
}