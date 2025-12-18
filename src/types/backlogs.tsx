export interface CreateBacklogData {
  Nom: string;       
}


export interface Backlog {
  Id: number;
  Nom: string;
  DateCreation: string;
  UserStoryId: number;
  ProjetId: number;
  SprintId: number;
  UserStories: any[]
}