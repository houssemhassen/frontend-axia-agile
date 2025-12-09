
import { useState } from "react";

export interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  due: string;
  project: string;
  progress: number;
}

export const useDeveloperTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement User Authentication",
      priority: "High",
      status: "In Progress",
      due: "Today",
      project: "Mobile App v2.0",
      progress: 75
    },
    {
      id: 2,
      title: "Fix Homepage Layout on Mobile",
      priority: "Medium",
      status: "In Progress",
      due: "Today",
      project: "Website Redesign",
      progress: 60
    },
    {
      id: 3,
      title: "Optimize Database Queries",
      priority: "High",
      status: "To Do",
      due: "Tomorrow",
      project: "Performance Improvements",
      progress: 0
    },
    {
      id: 4,
      title: "Create API Documentation",
      priority: "Medium",
      status: "To Do",
      due: "3 days",
      project: "API Integration",
      progress: 0
    }
  ]);

  return { tasks };
};
