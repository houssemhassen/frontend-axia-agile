
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
  trend: "up" | "down" | "neutral";
  delay?: number;
}

const StatCard = ({ title, value, icon, change, trend, delay = 0 }: StatCardProps) => {
  return (
    <Card className="animate-scale-in" style={{ animationDelay: `${delay * 0.1}s` }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
          ) : trend === "down" ? (
            <ArrowUpRight className="h-3 w-3 text-red-500 mr-1 rotate-180" />
          ) : null}
          {change}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
