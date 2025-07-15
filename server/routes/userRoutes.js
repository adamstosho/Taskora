const express = require('express');
const { getMyProfile, getUserTasks, uploadProfilePicture } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get current user's profile and stats
router.get('/me', protect, getMyProfile);

// Get a user's posted and claimed tasks
router.get('/:id/tasks', getUserTasks);

// Scaffold: Upload profile picture (inactive)
router.post('/me/profile-picture', protect, upload.single('profilePicture'), uploadProfilePicture);

module.exports = router; 