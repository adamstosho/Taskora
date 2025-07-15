import apiClient from './client';

export const usersAPI = {
  getMyProfile: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  getUserTasks: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/tasks`);
    return response.data;
  },

  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const response = await apiClient.post('/users/me/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};