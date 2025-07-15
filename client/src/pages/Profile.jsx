import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Calendar, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../api/users';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TaskCard from '../components/tasks/TaskCard';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getMyProfile();
      setProfile(response);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await usersAPI.uploadProfilePicture(file);
      await fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {profile?.user?.profilePicture ? (
                  <img
                    src={profile.user.profilePicture}
                    alt={profile.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <button
                className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                onClick={() => document.getElementById('profile-picture').click()}
                disabled={uploading}
              >
                {uploading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Camera size={16} />
                )}
              </button>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {profile?.user?.name}
              </h1>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {profile?.user?.location}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Joined {formatDate(profile?.user?.joinedAt)}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.user?.postedTasksCount || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Posted
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.user?.claimedTasksCount || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Claimed
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Posted Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          My Posted Tasks
        </h2>
        {profile?.postedTasks?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              You haven't posted any tasks yet
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => window.location.href = '/tasks/new'}
            >
              Post Your First Task
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile?.postedTasks?.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <TaskCard
                  task={task}
                  currentUser={user}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Claimed Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          My Claimed Tasks
        </h2>
        {profile?.claimedTasks?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              You haven't claimed any tasks yet
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => window.location.href = '/dashboard/tasks'}
            >
              Browse Tasks
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile?.claimedTasks?.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <TaskCard
                  task={task}
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

export default Profile;