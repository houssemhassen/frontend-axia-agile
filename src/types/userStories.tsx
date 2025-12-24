export interface CreateUserStoryData {
  Title: string;
  Description: string;
  AcceptanceCriteria: string;
  Status: string;
  Priority: string;
}

export interface UserStory {
  Id: number;
  Title: string;
  Description: string;
  AcceptanceCriteria: string;
  Status: string;
  Priority: string;
  CreatedAt: string;
  UpdatedAt: string;
  BacklogId: number;
  ProjetId: number;
  SprintId?: number;
  points: number;
  TaskIds: number[];
  CommentCount: number;
}