const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Professor = require('../models/Professor');
const Student = require('../models/Student');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ---------------- STUDENT AUTH ----------------

// POST /api/auth/student/register
router.post('/student/register', async (req, res) => {
  try {
    const { name, email, rollNumber, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = await Student.findOne({ $or: [{ email: normalizedEmail }, { rollNumber }] });
    const existingProf = await Professor.findOne({ email: normalizedEmail });
    
    if (existingStudent || existingProf) {
      return res.status(400).json({ message: 'User with this email or roll number already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = new Student({
      name,
      email: normalizedEmail,
      rollNumber,
      password: hashedPassword,
    });

    await student.save();

    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({ token, student: { id: student._id, name: student.name, email: student.email, rollNumber: student.rollNumber, role: 'student' } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/student/login
router.post('/student/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    let student = await Student.findOne({ email: normalizedEmail });
    if (!student) return res.status(400).json({ message: 'Student account not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({ token, student: { id: student._id, name: student.name, email: student.email, rollNumber: student.rollNumber, role: 'student' } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/auth/student/profile
router.get('/student/profile', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    res.json(student);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).send('Server error');
  }
});

// ---------------- PROFESSOR AUTH ----------------

// POST /api/auth/professor/register
router.post('/professor/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingProf = await Professor.findOne({ email: normalizedEmail });
    if (existingProf) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const professor = new Professor({ name, email: normalizedEmail, password: hashedPassword });
    await professor.save();

    const token = jwt.sign(
      { id: professor._id, role: 'professor' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({ token, professor: { id: professor._id, name: professor.name, email: professor.email, role: 'professor' } });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/professor/login
router.post('/professor/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const professor = await Professor.findOne({ email: normalizedEmail });
    if (!professor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, professor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: professor._id, role: 'professor' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({ token, professor: { id: professor._id, name: professor.name, email: professor.email, role: 'professor' } });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).send('Server error');
  }
});

// GET /api/auth/professor/profile
router.get('/professor/profile', authMiddleware, async (req, res) => {
  try {
    const professor = await Professor.findById(req.user.id).select('-password');
    res.json(professor);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).send('Server error');
  }
});

// ---------------- COMMON ----------------

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    let user;
    if (req.user.role === 'student') {
      user = await Student.findById(req.user.id).select('-password');
    } else {
      user = await Professor.findById(req.user.id).select('-password');
    }
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ ...user.toObject(), role: req.user.role });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/auth/status
router.get('/status', (req, res) => {
  const mongoose = require('mongoose');
  res.json({ status: 'online', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

module.exports = router;
