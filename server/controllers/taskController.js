const Task = require('../models/Task');
const { ErrorResponse } = require('../middleware/errorMiddleware');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, location, category } = req.body;
    const task = await Task.create({
      title,
      description,
      location,
      category,
      postedBy: req.user._id,
    });
    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('postedBy', 'name location');
    res.json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('postedBy', 'name location');
    if (!task) return next(new ErrorResponse('Task not found', 404));
    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task (owner only)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorResponse('Task not found', 404));
    if (task.postedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorResponse('Not authorized', 403));
    }
    const updates = ['title', 'description', 'location', 'category', 'status'];
    updates.forEach(field => {
      if (req.body[field] !== undefined) task[field] = req.body[field];
    });
    await task.save();
    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task (owner only)
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorResponse('Task not found', 404));
    if (task.postedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorResponse('Not authorized', 403));
    }
    await task.deleteOne();
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Claim a task (set claimedBy and status)
// @route   PATCH /api/tasks/:id/claim
// @access  Private
const claimTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorResponse('Task not found', 404));
    if (task.status !== 'open') {
      return next(new ErrorResponse('Task is not open for claiming', 400));
    }
    if (task.postedBy.toString() === req.user._id.toString()) {
      return next(new ErrorResponse('Cannot claim your own task', 400));
    }
    task.claimedBy = req.user._id;
    task.status = 'claimed';
    await task.save();
    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  claimTask,
}; 