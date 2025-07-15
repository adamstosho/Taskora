const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { ErrorResponse } = require('../middleware/errorMiddleware');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, location } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ErrorResponse('Email already in use', 400));
    }
    const user = await User.create({ name, email, password, location });
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        joinedAt: user.joinedAt,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        joinedAt: user.joinedAt,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        joinedAt: user.joinedAt,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe }; 