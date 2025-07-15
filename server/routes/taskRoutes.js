const express = require('express');
const { body } = require('express-validator');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  claimTask,
} = require('../controllers/taskController');
const { validate } = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create task
router.post(
  '/',
  protect,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ]),
  createTask
);

// Get all tasks
router.get('/', getTasks);

// Get single task
router.get('/:id', getTask);

// Update task (owner only)
router.put(
  '/:id',
  protect,
  validate([
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('status').optional().isIn(['open', 'claimed', 'completed', 'cancelled']).withMessage('Invalid status'),
  ]),
  updateTask
);

// Delete task (owner only)
router.delete('/:id', protect, deleteTask);

// Claim task
router.patch('/:id/claim', protect, claimTask);

module.exports = router; 