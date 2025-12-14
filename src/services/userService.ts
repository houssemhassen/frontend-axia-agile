import api from "./api";

export const fetchAllUsers = async () => {
    try {
        const response = await api.get('/users');
        console.log('Response:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    roleId?: number;
    password: string;
}) => {
    try {
        const response = await api.post('/auth/create', userData);
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export const updateUser = async (userId: string, userData: {
    firstName: string;
    lastName: string;
    email: string;
    roleId?: number;
}) => {
    try {
        const response = await api.put(`/users/${userId}`, userData);
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const toggleUserActive = async (userId: string, isActive: boolean) => {
    try {
        const response = await api.put(`/users/${userId}/status`, isActive, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Error toggling user active status:', error);
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};