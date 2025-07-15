import { useState, useEffect } from 'react';
import { tasksAPI } from '../api/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAllTasks();
      setTasks(response.tasks);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    try {
      const response = await tasksAPI.createTask(taskData);
      setTasks(prev => [response.task, ...prev]);
      return { success: true, task: response.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to create task' };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await tasksAPI.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.task : task
      ));
      return { success: true, task: response.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to update task' };
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to delete task' };
    }
  };

  const claimTask = async (id) => {
    try {
      const response = await tasksAPI.claimTask(id);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.task : task
      ));
      return { success: true, task: response.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to claim task' };
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    claimTask,
  };
};