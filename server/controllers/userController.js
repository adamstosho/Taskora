const Task = require('../models/Task');
const { ErrorResponse } = require('../middleware/errorMiddleware');
const path = require('path');
const User = require('../models/User');

// @desc    Get current user's profile and stats
// @route   GET /api/users/me
// @access  Private
const getMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const postedTasks = await Task.find({ postedBy: user._id });
    const claimedTasks = await Task.find({ claimedBy: user._id });
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        joinedAt: user.joinedAt,
        role: user.role,
        postedTasksCount: postedTasks.length,
        claimedTasksCount: claimedTasks.length,
      },
      postedTasks,
      claimedTasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a user's posted and claimed tasks
// @route   GET /api/users/:id/tasks
// @access  Public
const getUserTasks = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const postedTasks = await Task.find({ postedBy: userId });
    const claimedTasks = await Task.find({ claimedBy: userId });
    res.json({
      success: true,
      postedTasksCount: postedTasks.length,
      claimedTasksCount: claimedTasks.length,
      postedTasks,
      claimedTasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload profile picture (active)
// @route   POST /api/users/me/profile-picture
// @access  Private
const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // Build the image URL (assuming static serving from /uploads)
    const imageUrl = `/uploads/profile-pictures/${req.file.filename}`;
    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profilePicture: imageUrl } },
      { new: true }
    );
    res.json({ success: true, message: 'Profile picture uploaded', imageUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  getUserTasks,
  uploadProfilePicture,
}; 