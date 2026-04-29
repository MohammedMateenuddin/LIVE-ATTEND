const express = require('express');
const Session = require('../models/Session');
const Student = require('../models/Student');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/attendance/mark - Mark attendance for a student
router.post('/mark', authMiddleware, async (req, res) => {
  try {
    const { sessionId, token } = req.body;
    const studentId = req.user.id;

    if (!sessionId || !token) {
      return res.status(400).json({ message: 'Missing session ID or token' });
    }

    // 1. Validate token (Removed age check per user request for static QR)
    const tokenTimestamp = parseInt(token.split('-')[0]);
    if (isNaN(tokenTimestamp)) {
      return res.status(400).json({ message: 'Invalid QR token' });
    }

    // 2. Find and validate session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    if (!session.isActive) {
      return res.status(400).json({ message: 'Session is no longer active' });
    }

    // 3. Check if already marked
    const alreadyMarked = session.attendees.some(a => a.studentId.toString() === studentId);
    if (alreadyMarked) {
      return res.status(400).json({ message: 'Attendance already marked' });
    }

    // 4. Get student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 5. Add to attendees
    session.attendees.push({
      studentId: student._id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      timestamp: new Date()
    });

    await session.save();

    res.json({ message: 'Attendance marked successfully', studentName: student.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/attendance/student/history - Get attendance history for the logged-in student
router.get('/student/history', authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;
    const sessions = await Session.find({ 'attendees.studentId': studentId }).sort({ createdAt: -1 });

    const history = sessions.map(s => {
      const attendance = s.attendees.find(a => a.studentId.toString() === studentId);
      return {
        sessionId: s._id,
        courseCode: s.courseCode,
        professorName: s.professorName,
        date: s.createdAt,
        markedAt: attendance ? attendance.timestamp : null,
        status: 'Present'
      };
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/attendance/student/stats - Get attendance stats for student
router.get('/student/stats', authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;
    const totalSessions = await Session.countDocuments({ isActive: false }); // or some other criteria for total classes
    const attendedSessions = await Session.countDocuments({ 'attendees.studentId': studentId });
    
    // Fallback for demo/initial state if totalSessions is 0
    const percentage = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 92; 
    
    res.json({ percentage: Math.round(percentage), attended: attendedSessions, total: totalSessions });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
