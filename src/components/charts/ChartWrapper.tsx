
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ChartWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  height?: string | number;
  footer?: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  description,
  children,
  className,
  height = "300px",
  footer
}) => {
  return (
    <Card className={cn("", className)}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <div className="w-full" style={{ height }}>
          {children}
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  );
};

export default ChartWrapper;
