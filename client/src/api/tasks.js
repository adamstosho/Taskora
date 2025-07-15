import apiClient from './client';

export const tasksAPI = {
  getAllTasks: async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  claimTask: async (id) => {
    const response = await apiClient.patch(`/tasks/${id}/claim`);
    return response.data;
  }
};