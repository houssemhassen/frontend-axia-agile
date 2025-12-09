import { apiClient } from "./api";

export const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
