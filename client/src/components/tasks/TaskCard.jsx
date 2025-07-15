import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Tag } from 'lucide-react';
import { STATUS_COLORS, CATEGORY_COLORS } from '../../constants/enums';
import Card from '../common/Card';
import Button from '../common/Button';

const TaskCard = ({ task, onClaim, onEdit, onDelete, currentUser }) => {
  const canClaim = task.status === 'open' && task.postedBy._id !== currentUser?._id;
  const canEdit = task.postedBy._id === currentUser?._id;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[task.status]}`}>
            {task.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[task.category]}`}>
            {task.category}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={16} className="mr-2" />
          {task.location}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <User size={16} className="mr-2" />
          Posted by {task.postedBy.name}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar size={16} className="mr-2" />
          {formatDate(task.createdAt)}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {canClaim && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onClaim(task._id)}
            >
              Claim Task
            </Button>
          )}
          
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(task)}
            >
              Edit
            </Button>
          )}
          
          {canEdit && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </Button>
          )}
        </div>
        
        {task.claimedBy && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Claimed by {task.claimedBy.name}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;