
import React from 'react';
import { ListCheck, Clock, BarChart3, Milestone } from "lucide-react";
import DataCard from "@/components/data-display/DataCard";
import MetricDisplay from "@/components/data-display/MetricDisplay";

const DashboardStats = () => {
  // Stats for product owner
  const stats = [
    {
      title: "Total Backlog Items",
      value: "27",
      icon: <ListCheck size={20} />,
      change: "+3 this week",
      trend: "up" as const
    },
    {
      title: "Avg. Delivery Time",
      value: "12 days",
      icon: <Clock size={20} />,
      change: "-2 days from previous",
      trend: "up" as const
    },
    {
      title: "Business Value Delivered",
      value: "78%",
      icon: <BarChart3 size={20} />,
      change: "+8% this quarter",
      trend: "up" as const
    },
    {
      title: "Upcoming Milestones",
      value: "3",
      icon: <Milestone size={20} />,
      change: "Next: Beta Release",
      trend: "neutral" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <DataCard
          key={i}
          title={stat.title}
          icon={stat.icon}
          className="animate-scale-in"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <MetricDisplay 
            value={stat.value} 
            change={stat.change} 
            trend={stat.trend} 
          />
        </DataCard>
      ))}
    </div>
  );
};

export default DashboardStats;
