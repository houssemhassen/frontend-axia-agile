import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  actions, 
  className = "" 
}: PageHeaderProps) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 flex space-x-3 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;