import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { createUser, deleteUser, fetchAllUsers, toggleUserActive, updateUser } from "@/services/userService";
import { fetchAllRoles } from "@/services/roleService";
import { User } from "@/types/users";
import { Role } from "@/types/roles";
import { USER_FORM_MESSAGES } from "@/constants/userManagement";

interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    roleId?: number;
}

export const useUserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingRoles, setLoadingRoles] = useState(false);

    const loadData = useCallback(async () => {
        setLoadingUsers(true);
        setLoadingRoles(true);

        try {
            const [rolesResponse, usersResponse] = await Promise.all([
                fetchAllRoles(),
                fetchAllUsers(),
            ]);

            setRoles(rolesResponse.data);
            setUsers(usersResponse.data);
        } catch (error) {
            console.error("Error loading data:", error);
            toast.error("Failed to load data");
            setUsers([]);
            setRoles([]);
        } finally {
            setLoadingUsers(false);
            setLoadingRoles(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const addUser = useCallback(async (userData: UserFormData) => {
        if (!userData.password) {
            throw new Error("Password is required");
        }

        try {
            const response = await createUser({
                firstName: userData.firstName.trim(),
                lastName: userData.lastName.trim(),
                email: userData.email.trim().toLowerCase(),
                password: userData.password,
                roleId: userData.roleId,
            });

            setUsers(prev => [...prev, response.data]);
            toast.success("User added successfully");
            return response.data;
        } catch (error: any) {
            handleApiError(error, "Failed to add user");
            throw error;
        }
    }, []);

    const editUser = useCallback(async (userId: string, userData: UserFormData) => {
        try {
            //   console.log("edit ",userData.roleId);
            const response = await updateUser(userId, {
                firstName: userData.firstName.trim(),
                lastName: userData.lastName.trim(),
                email: userData.email.trim().toLowerCase(),
                roleId: userData.roleId,
            });

            setUsers(prev => prev.map(u => u.id === userId ? response.data : u));
            toast.success("User updated successfully");
            return response.data;
        } catch (error: any) {
            handleApiError(error, "Failed to update user");
            throw error;
        }
    }, []);

    const isEmailExists = useCallback((email: string, excludeUserId?: string) => {
        return users.some(u =>
            u.id !== excludeUserId &&
            u.email.toLowerCase() === email.toLowerCase()
        );
    }, [users]);

    const toggleActiveStatus = useCallback(async (userId: string) => {
        try {
            const user = users.find(u => u.id === userId);
            if (!user) {
                throw new Error("User not found");
            }

            const newStatus = !user.isActive;

            console.log(`Toggling user ${userId} from ${user.isActive} to ${newStatus}`);

            await toggleUserActive(userId, newStatus);

            loadData();

            toast.success(newStatus ? "User activated successfully" : "User deactivated successfully");
        } catch (error: any) {
            handleApiError(error, "Failed to toggle user status");
            throw error;
        }
    }, [users]);


    const removeUser = useCallback(async (userId: string) => {
        try {
            await deleteUser(userId);
            setUsers(prev => prev.filter(u => u.id !== userId));
            toast.success(USER_FORM_MESSAGES.DELETE_SUCCESS);
        } catch (error: any) {
            handleApiError(error, "Failed to delete user");
            throw error;
        }
    }, []);

    return {
        users,
        roles,
        loadingUsers,
        loadingRoles,
        addUser,
        editUser,
        toggleActiveStatus,
        isEmailExists,
        removeUser
    };
};

const handleApiError = (error: any, defaultMessage: string) => {
    if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages: string[] = [];

        Object.keys(errors).forEach(key => {
            if (Array.isArray(errors[key])) {
                errorMessages.push(...errors[key]);
            }
        });

        errorMessages.forEach(msg => toast.error(msg));
    } else {
        const errorMessage = error.response?.data?.title || error.response?.data?.message || defaultMessage;
        toast.error(errorMessage);
    }
};