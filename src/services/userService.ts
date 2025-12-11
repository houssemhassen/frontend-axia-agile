import api  from "./api";

export const fetchAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
