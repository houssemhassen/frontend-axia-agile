
import { useState } from "react";

export interface Commit {
  id: string;
  message: string;
  branch: string;
  timestamp: string;
}

export const useCommits = () => {
  const [commits, setCommits] = useState<Commit[]>([
    {
      id: "a1b2c3d",
      message: "Fix user authentication error handling",
      branch: "feature/user-auth",
      timestamp: "2 hours ago"
    },
    {
      id: "e5f6g7h",
      message: "Update mobile layout for homepage",
      branch: "fix/mobile-layout",
      timestamp: "4 hours ago"
    },
    {
      id: "i9j0k1l",
      message: "Implement new API endpoints for user data",
      branch: "feature/api-endpoints",
      timestamp: "Yesterday"
    }
  ]);

  return { commits };
};
