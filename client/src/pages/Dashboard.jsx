import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Users, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { usersAPI } from '../api/users';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TaskCard from '../components/tasks/TaskCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading: tasksLoading, claimTask } = useTasks();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await usersAPI.getMyProfile();
      setUserProfile(response);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimTask = async (taskId) => {
    const result = await claimTask(taskId);
    if (result.success) {
      // Refresh user profile to update stats
      fetchUserProfile();
    }
  };

  const recentTasks = tasks.slice(0, 6);
  const openTasks = tasks.filter(task => task.status === 'open');

  if (loading || tasksLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-green-100 mb-6">
            Ready to help your community or get some help yourself?
          </p>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/tasks/new'}
            className="bg-yellow-500 text-green-600 hover:bg-gray-50"
          >
            <Plus className="mr-2" size={20} />
            Post New Task
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tasks Posted
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile?.user?.postedTasksCount || 0}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tasks Claimed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile?.user?.claimedTasksCount || 0}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Your Location
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.location}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Tasks
          </h2>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/tasks'}
          >
            View All Tasks
          </Button>
        </div>

        {openTasks.length === 0 ? (
          <Card className="p-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tasks available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to post a task in your community!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <TaskCard
                  task={task}
                  onClaim={handleClaimTask}
                  currentUser={user}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;