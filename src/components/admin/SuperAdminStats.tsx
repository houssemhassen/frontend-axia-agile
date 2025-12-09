import React from 'react';
import { Users, FolderOpen, Bell, Activity } from "lucide-react";
import DataCard from '../data-display/DataCard';
import MetricDisplay from '../data-display/MetricDisplay';

interface StatItem {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  trend: "up" | "down";
}

interface SuperAdminStatsProps {
  stats: StatItem[];
}

const SuperAdminStats: React.FC<SuperAdminStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <DataCard
          key={i}
          title={stat.title}
          icon={stat.icon}
          className="animate-scale-in"
          contentClassName={`animate-scale-in-delay-${i}`}
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

export default SuperAdminStats;