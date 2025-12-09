
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useDeveloperActions = () => {
  const navigate = useNavigate();

  const handleViewKanban = () => {
    navigate('/kanban');
    toast.info("Viewing Kanban board");
  };

  const handleLogTime = () => {
    toast.info("Opening time logging dialog");
  };

  return {
    handleViewKanban,
    handleLogTime
  };
};
