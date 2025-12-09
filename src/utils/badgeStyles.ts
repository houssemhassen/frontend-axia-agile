
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    unassigned: "bg-gray-100 text-gray-800",
    assigned: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800"
  };
  return statusColors[status] || "bg-gray-100";
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    highest: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
    lowest: "bg-gray-100 text-gray-800"
  };
  return priorityColors[priority] || "bg-gray-100";
};
