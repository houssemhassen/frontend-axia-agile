
import { useState } from "react";

export interface DeveloperStat {
  title: string;
  value: string;
  icon: JSX.Element;
  change: string;
  trend: "up" | "down" | "neutral";
}

export const useDeveloperStats = () => {
  const [stats, setStats] = useState<DeveloperStat[]>([
    {
      title: "Assigned Tasks",
      value: "8",
      icon: null, // Will be set in the component
      change: "3 due today",
      trend: "neutral" as const
    },
    {
      title: "Hours Logged",
      value: "32",
      icon: null, // Will be set in the component
      change: "This week",
      trend: "neutral" as const
    },
    {
      title: "Completed Tasks",
      value: "5",
      icon: null, // Will be set in the component
      change: "+2 since yesterday",
      trend: "up" as const
    },
    {
      title: "Pull Requests",
      value: "3",
      icon: null, // Will be set in the component
      change: "1 needs review",
      trend: "neutral" as const
    }
  ]);

  return { stats };
};
