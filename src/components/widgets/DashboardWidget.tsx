import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface WidgetData {
  id: string;
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
  data?: any[];
  color?: string;
}

interface DashboardWidgetProps {
  widget: WidgetData;
  size?: "small" | "medium" | "large";
  children?: ReactNode;
  className?: string;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ 
  widget, 
  size = "medium", 
  children, 
  className = "" 
}) => {
  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-2", 
    large: "col-span-3"
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${sizeClasses[size]} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {widget.title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {widget.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">{widget.value}</div>
          {widget.change && (
            <p className="text-xs text-muted-foreground flex items-center">
              <span 
                className={`mr-1 ${
                  widget.trend === "up" ? "text-green-500" : 
                  widget.trend === "down" ? "text-red-500" : 
                  "text-muted-foreground"
                }`}
              >
                {widget.trend === "up" ? "↗" : widget.trend === "down" ? "↘" : "→"}
              </span>
              {widget.change}
            </p>
          )}
          {widget.description && (
            <p className="text-xs text-muted-foreground">{widget.description}</p>
          )}
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardWidget;