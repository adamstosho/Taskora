const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['Lagos', 'Abuja', 'Ilorin', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Benin City', 'Jos', "Ogbomoso", "Oyo", 'Abeokuta', "Awka", "Onitsha", "Nnewi", "Ekwulobia", "Obosi", "Ikeja", "Lagos Island", "Lekki", "Surulere", "Badagry", "Minna", "Ilorin", "Offa", "Omu-Aran", "Lafiagi", "Patigi", "Bida", "Suleja", "Kontagora", "Zungeru", 'Other'],
    default: 'Other',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User; 