import ApiClient from './ApiClient';

// Task-related API functions
const getTasks = () => {
    return ApiClient.get('/tasks');
};

const getTaskById = (taskId) => {
    return ApiClient.get(`/tasks/${taskId}`);
};

const createTask = (task) => {
    return ApiClient.post('/tasks', task);
};

const updateTask = (taskId, task) => {
    return ApiClient.put(`/tasks/${taskId}`, task);
};

const deleteTask = (taskId) => {
    return ApiClient.delete(`/tasks/${taskId}`);
};

export default {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
