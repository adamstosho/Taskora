import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/tasks/TaskForm';

const NewTask = () => {
  const [loading, setLoading] = useState(false);
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    const result = await createTask(formData);
    
    if (result.success) {
      navigate('/tasks');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Task
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Post a task and get help from your community
          </p>
        </div>

        <TaskForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </motion.div>
    </div>
  );
};

export default NewTask;