
import React from 'react';
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricDisplayProps {
  value: string | number;
  label?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  change,
  trend = 'neutral',
  className,
  valueClassName,
  labelClassName
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
      {label && <p className={cn("text-sm text-muted-foreground", labelClassName)}>{label}</p>}
      {change && (
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
          ) : trend === "down" ? (
            <ArrowUpRight className="h-3 w-3 text-red-500 mr-1 rotate-180" />
          ) : null}
          {change}
        </p>
      )}
    </div>
  );
};

export default MetricDisplay;
