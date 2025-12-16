import api from "./api";

export const fetchAllProjects = async () => {
    try {
        const response = await api.get('/project');
        console.log('Response:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const createProject = async (projectData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    priority: string;
    productOwner: string;
    scrumMaster: string;
    methodology: string;
    members: string[];
}) => {
    try {
        const response = await api.post('/project', projectData);
        return response;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};