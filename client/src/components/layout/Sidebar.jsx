import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  List, 
  User, 
  Plus, 
  Search,
  TrendingUp,
  Users,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'All Tasks', path: '/dashboard/tasks', icon: List },
    { name: 'New Task', path: '/dashboard/tasks/new', icon: Plus },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
    { name: 'Search', path: '/dashboard/search', icon: Search },
    { name: 'Stats', path: '/dashboard/stats', icon: TrendingUp },
    { name: 'Users', path: '/dashboard/users', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  // Function to handle link click and close sidebar on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 768 && isOpen && setSidebarOpen) {
      setSidebarOpen(false);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg md:relative md:translate-x-0"
        >
          {/* Close button for mobile */}
          <button
            className="absolute top-4 right-4 md:hidden p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            type="button"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col h-full pt-20 md:pt-4">
            <div className="px-4 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Navigation
              </h2>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Taskora v1.0.0
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;