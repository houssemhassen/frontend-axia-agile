import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-12 h-12",
  lg: "w-16 h-16"
};

const LoadingSpinner = ({ 
  size = "md", 
  className = "", 
  text 
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div 
        className={cn(
          "animate-spin border-4 border-primary border-t-transparent rounded-full",
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <p className="mt-4 text-muted-foreground">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;