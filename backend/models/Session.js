const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  studentName: String,
  rollNumber: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const sessionSchema = new mongoose.Schema({
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  radius: {
    type: Number,
    default: 50 // meters
  },
  durationMinutes: {
    type: Number,
    default: 1
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  attendees: [attendeeSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Session', sessionSchema);
