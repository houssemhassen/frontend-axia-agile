
import React from "react";
import { ListTodo, Clock, CheckCircle, GitBranch } from "lucide-react";
import StatCard from "@/components/developer/StatCard";
import { useDeveloperStats } from "@/hooks/useDeveloperStats";

const DashboardStats = () => {
  const { stats } = useDeveloperStats();
  
  // Icons need to be added here as they can't be serialized in useState
  const iconsMap = {
    "Assigned Tasks": <ListTodo className="h-5 w-5" />,
    "Hours Logged": <Clock className="h-5 w-5" />,
    "Completed Tasks": <CheckCircle className="h-5 w-5" />,
    "Pull Requests": <GitBranch className="h-5 w-5" />
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard 
          key={i}
          title={stat.title}
          value={stat.value}
          icon={iconsMap[stat.title as keyof typeof iconsMap]}
          change={stat.change}
          trend={stat.trend}
          delay={i}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
