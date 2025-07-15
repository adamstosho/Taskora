const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 1000,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['Lagos', 'Abuja', 'Ilorin', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Benin City', 'Jos', "Ogbomoso", "Oyo", 'Abeokuta', "Awka", "Onitsha", "Nnewi", "Ekwulobia", "Obosi", "Ikeja", "Lagos Island", "Lekki", "Surulere", "Badagry", "Minna", "Ilorin", "Offa", "Omu-Aran", "Lafiagi", "Patigi", "Bida", "Suleja", "Kontagora", "Zungeru", 'Other'],
    default: 'Other',
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Tutoring', 'Errands', 'Repairs', 'Transport', 'Volunteer', 'Paid', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['open', 'claimed', 'completed', 'cancelled'],
    default: 'open',
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task; 