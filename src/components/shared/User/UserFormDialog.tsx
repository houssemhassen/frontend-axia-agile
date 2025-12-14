import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Role } from "@/types/roles";
import { User } from "@/types/users";
import { USER_FORM_MESSAGES } from "@/constants/userManagement";
import { validateUserForm } from "@/lib/validators";

interface UserFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: UserFormData) => Promise<void>;
    roles: Role[];
    loadingRoles: boolean;
    editingUser?: User | null;
    isEmailExists: (email: string, excludeUserId?: string) => boolean;
}

interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    roleId?: number;
}

export const UserFormDialog = ({
    open,
    onOpenChange,
    onSubmit,
    roles,
    loadingRoles,
    editingUser,
    isEmailExists,
}: UserFormDialogProps) => {
    const isEditMode = !!editingUser;

    const [formData, setFormData] = useState<UserFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: undefined,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setFormData({
                firstName: editingUser.firstName,
                lastName: editingUser.lastName,
                email: editingUser.email,
                roleId: editingUser.roleId,
            });
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                roleId: undefined,
            });
        }
    }, [editingUser, open]);

    const handleSubmit = async () => {
        const validation = validateUserForm(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            !isEditMode
        );

        if (!validation.isValid) {
            toast.error(validation.error);
            return;
        }

        if (isEmailExists(formData.email, editingUser?.id)) {
            toast.error(USER_FORM_MESSAGES.EMAIL_EXISTS);
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            onOpenChange(false);
        } catch (error) {
            // Error already handled in the hook
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Update user information. All fields are required."
                            : "Create a new user account. All fields are required."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={isSubmitting}
                        />
                    </div>

                    {!isEditMode && (
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="At least 6 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                disabled={isSubmitting}
                            />
                            <p className="text-xs text-muted-foreground">
                                Minimum 6 characters
                            </p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">
                            Role {isEditMode ? "" : "(Optional)"}
                        </label>

                        <div className="flex gap-2">
                            <Select
                                value={formData.roleId?.toString() || ""}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, roleId: value ? parseInt(value) : undefined });
                                }}
                                disabled={loadingRoles || isSubmitting}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder={loadingRoles ? "Loading roles..." : "Select a role"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.id.toString()}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {isEditMode && formData.roleId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setFormData({ ...formData, roleId: undefined })}
                                    disabled={isSubmitting}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {!isEditMode && (
                            <p className="text-xs text-muted-foreground">
                                Leave empty for no role assignment
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isEditMode ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                        {isSubmitting ? "Saving..." : (isEditMode ? "Update User" : "Add User")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};