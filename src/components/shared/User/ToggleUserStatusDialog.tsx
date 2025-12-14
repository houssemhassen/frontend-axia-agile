import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/types/users";

interface ToggleUserStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
}

export const ToggleUserStatusDialog = ({
  open,
  onOpenChange,
  onConfirm,
  user,
}: ToggleUserStatusDialogProps) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  const isDeactivating = user?.isActive;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isDeactivating ? "Deactivate User" : "Activate User"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isDeactivating ? (
              <>
                Are you sure you want to deactivate{" "}
                <span className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>{" "}
                ({user?.email})? They will not be able to access the system until reactivated.
              </>
            ) : (
              <>
                Are you sure you want to activate{" "}
                <span className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>{" "}
                ({user?.email})? They will be able to access the system again.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              isDeactivating
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-green-600 text-white hover:bg-green-700"
            }
          >
            {isDeactivating ? "Deactivate" : "Activate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};