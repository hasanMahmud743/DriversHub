const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['CNG', 'Auto Rickshaw', 'Train Blacker', 'Shuttle Bus', 'Van Driver']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  addedBy: {
    type: String, // Firebase UID
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Operator', operatorSchema);
