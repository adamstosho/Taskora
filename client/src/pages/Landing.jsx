import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    title: 'Connect Communities',
    description: 'Bring people together to share and solve tasks locally.',
    icon: '🤝',
  },
  {
    title: 'Easy Task Management',
    description: 'Post, claim, and manage tasks with just a few clicks.',
    icon: '✅',
  },
  {
    title: 'Secure & Trustworthy',
    description: 'Safe authentication and user profiles for peace of mind.',
    icon: '🔒',
  },
  {
    title: 'Mobile Friendly',
    description: 'Enjoy a seamless experience on any device.',
    icon: '📱',
  },
  {
    title: 'Dark Mode',
    description: 'Switch between light and dark themes for comfort.',
    icon: '🌙',
  },
];

const bgAnimation = {
  animate: {
    backgroundPosition: [
      '0% 50%',
      '100% 50%',
      '0% 50%'
    ],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const Landing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <motion.div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(120deg, #bbf7d0 0%, #f0fdf4 50%, #6ee7b7 100%)',
      }}
      variants={bgAnimation}
      animate="animate"
    >
      {/* Animated background shapes */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full opacity-30 blur-2xl z-0"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-400 dark:bg-green-700 rounded-full opacity-20 blur-2xl z-0"
        animate={{
          scale: [1, 1.05, 1],
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 shadow-lg rounded-3xl mb-8 border-4 border-white dark:border-gray-900">
            <span className="text-white text-5xl font-extrabold drop-shadow-lg">T</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 drop-shadow">
            Welcome to <span className="text-green-600 dark:text-green-400">Taskora</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Taskora helps Nigerian communities connect, share, and solve tasks together. Post what you need, help others, and build a stronger community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-10 py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition text-lg">
              Get Started
            </Link>
            <Link to="/login" className="px-10 py-4 rounded-xl bg-white text-green-700 font-bold border-2 border-green-600 shadow-lg hover:bg-green-50 transition text-lg dark:bg-gray-900 dark:text-green-400 dark:border-green-400">
              Log In
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-14">
            Why use Taskora?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-green-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-2xl transition flex flex-col items-center text-center border border-green-100 dark:border-green-700"
                whileHover={{ y: -6, scale: 1.04 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-5xl mb-4 drop-shadow-lg">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="py-12 bg-gradient-to-br from-green-600 to-green-500 text-white text-center relative z-10">
        <h3 className="text-3xl font-bold mb-4 drop-shadow">Ready to join your community?</h3>
        <Link to="/register" className="inline-block mt-2 px-10 py-4 rounded-xl bg-white text-green-700 font-bold shadow-lg hover:bg-green-50 transition text-lg">
          Create an Account
        </Link>
      </footer>
    </motion.div>
  );
};

export default Landing; 