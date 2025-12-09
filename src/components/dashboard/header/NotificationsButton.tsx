
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NotificationsButtonProps {
  count: number;
  onNotificationClick: () => void;
}

export const NotificationsButton = ({ count, onNotificationClick }: NotificationsButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="relative text-indigo-600 hover:text-indigo-700"
      onClick={onNotificationClick}
    >
      <Bell size={18} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-600 text-xs text-white flex items-center justify-center">
          {count}
        </span>
      )}
    </Button>
  );
};
