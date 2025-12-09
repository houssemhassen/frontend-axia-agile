
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DataCardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  icon,
  children,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  onClick,
  style
}) => {
  return (
    <Card 
      className={cn("transition-all", onClick && "hover:shadow-md cursor-pointer", className)} 
      onClick={onClick}
      style={style}
    >
      {(title || icon) && (
        <CardHeader className={cn("flex flex-row items-center justify-between pb-2", headerClassName)}>
          {title && <CardTitle className="text-sm font-medium">{title}</CardTitle>}
          {icon && (
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("pt-0", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DataCard;
