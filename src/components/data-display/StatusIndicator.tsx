
import React from 'react';
import { cn } from "@/lib/utils";

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md',
  className
}) => {
  const statusClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
  };

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        statusClasses[status],
        sizeClasses[size],
        className
      )}
    >
      {label}
    </span>
  );
};

export default StatusIndicator;
