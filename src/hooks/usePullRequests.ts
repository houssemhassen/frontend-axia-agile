
import { useState } from "react";

export interface PullRequest {
  id: number;
  title: string;
  branch: string;
  status: string;
  comments: number;
  updatedAt: string;
}

export const usePullRequests = () => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([
    {
      id: 1,
      title: "Feature/user-auth",
      branch: "feature/user-auth",
      status: "Needs Review",
      comments: 3,
      updatedAt: "1 hour ago"
    },
    {
      id: 2,
      title: "Fix/mobile-layout",
      branch: "fix/mobile-layout",
      status: "Needs Changes",
      comments: 5,
      updatedAt: "3 hours ago"
    },
    {
      id: 3,
      title: "Feature/api-endpoints",
      branch: "feature/api-endpoints",
      status: "Approved",
      comments: 0,
      updatedAt: "Yesterday"
    }
  ]);

  return { pullRequests };
};
