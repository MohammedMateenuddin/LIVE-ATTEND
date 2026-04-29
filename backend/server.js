process.on('uncaughtException', err => console.error('🔥 CRITICAL SERVER CRASH:', err));
process.on('unhandledRejection', err => console.error('🔥 UNHANDLED REJECTION:', err));

require('dotenv').config();

// Pre-flight Checks (Fix 3)
if (!process.env.MONGO_URI && !process.env.DATABASE_URL) {
  console.error('❌ FATAL: MONGO_URI or DATABASE_URL missing in .env');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ FATAL: JWT_SECRET missing in .env');
  process.exit(1);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session');
const attendanceRoutes = require('./routes/attendance');

const app = express();

// 1. Global DB Error Listeners
mongoose.connection.on('error', err => {
  console.error('❌ MongoDB runtime error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/attendance', attendanceRoutes);

// MongoDB Connection (Fix 2: Sequential Boot)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

const startServer = async () => {
  try {
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server fully operational on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();

// Global Error Sentinel
app.use((err, req, res, next) => {
  console.error('🔥 GLOBAL SERVER ERROR:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
