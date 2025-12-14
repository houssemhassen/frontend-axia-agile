import api  from "./api";

export const fetchAllRoles = async () => {
    try {
        const response = await api.get('/users/roles');
        return response;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
