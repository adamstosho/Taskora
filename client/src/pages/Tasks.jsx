import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import TaskForm from '../components/tasks/TaskForm';

const Tasks = () => {
  const { user } = useAuth();
  const { tasks, loading, createTask, updateTask, deleteTask, claimTask } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    status: '',
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    filterTasks();
  }, [tasks, filters]);

  const filterTasks = () => {
    let filtered = tasks;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(task => task.location === filters.location);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    setFilteredTasks(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      status: '',
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = async (formData) => {
    const result = await updateTask(editingTask._id, formData);
    if (result.success) {
      setShowEditModal(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleClaimTask = async (taskId) => {
    await claimTask(taskId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Find tasks in your community or help others
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/tasks/new'}
        >
          <Plus className="mr-2" size={20} />
          New Task
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </motion.div>

      {/* Tasks Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No tasks found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <TaskCard
                  task={task}
                  onClaim={handleClaimTask}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  currentUser={user}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Edit Task Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Task"
        size="lg"
      >
        <TaskForm
          onSubmit={handleUpdateTask}
          initialData={editingTask}
        />
      </Modal>
    </div>
  );
};

export default Tasks;