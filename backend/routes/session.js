const express = require('express');
const Session = require('../models/Session');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/sessions/create - Create a new session
router.post('/create', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'professor') {
      return res.status(403).json({ message: 'Only professors can create sessions' });
    }

    const { courseCode, radius, durationMinutes, latitude, longitude, subjectName } = req.body;

    if (!courseCode) {
      return res.status(400).json({ message: 'Course Code is required' });
    }
    
    if (!subjectName) {
      return res.status(400).json({ message: 'Subject Name is required' });
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (durationMinutes || 1440));

    const session = new Session({
      professorId: req.user.id,
      subjectName,
      courseCode,
      radius: radius || 50,
      durationMinutes: durationMinutes || 1440,
      latitude,
      longitude,
      expiresAt,
      isActive: true
    });

    await session.save();
    res.status(201).json({ id: session._id, ...session.toObject() });
  } catch (err) {
    console.error('CRITICAL SESSION API ERROR:', err);
    res.status(500).json({ 
      message: 'Server error during session creation', 
      details: err.message 
    });
  }
});

// GET /api/sessions/professor/history - Get all sessions by professor
router.get('/professor/history', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'professor') return res.status(403).json({ message: 'Forbidden' });
    const sessions = await Session.find({ professorId: req.user.id }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error('Session API Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sessions/:sessionId - Get session details
router.get('/:sessionId', async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ id: session._id, ...session.toObject() });
  } catch (err) {
    console.error('Session API Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sessions/:sessionId/end - End session
router.post('/:sessionId/end', authMiddleware, async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    
    if (session.professorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    session.isActive = false;
    await session.save();
    res.json({ message: 'Session ended' });
  } catch (err) {
    console.error('Session API Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sessions/:sessionId/attendance - Get list of marked students
router.get('/:sessionId/attendance', async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session.attendees || []);
  } catch (err) {
    console.error('Session API Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
