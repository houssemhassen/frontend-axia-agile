
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessagesButtonProps {
  onClick: () => void;
}

export const MessagesButton = ({ onClick }: MessagesButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={onClick}
      className="text-indigo-600 hover:text-indigo-700"
    >
      <MessageSquare size={18} />
    </Button>
  );
};
