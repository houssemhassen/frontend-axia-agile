import React from "react";
import DashboardWidget, { WidgetData } from "./DashboardWidget";

interface WidgetGridProps {
  widgets: WidgetData[];
  columns?: number;
  className?: string;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ 
  widgets, 
  columns = 4, 
  className = "" 
}) => {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };

  return (
    <div className={`grid gap-4 ${gridClasses[columns as keyof typeof gridClasses] || gridClasses[4]} ${className}`}>
      {widgets.map((widget, index) => (
        <div key={widget.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <DashboardWidget
            widget={widget}
            className="animate-scale-in"
          />
        </div>
      ))}
    </div>
  );
};

export default WidgetGrid;