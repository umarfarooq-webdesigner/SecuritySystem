const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route imports
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const lockedSysAppRoutes = require('./routes/lockedSysApp');
const securityStaffRoutes = require('./routes/securityStaff');
const accessLogsRoutes = require('./routes/accessLogs');
const guestRegistrationRoutes = require('./routes/guest');
const adminRoutes = require('./routes/adminRoutes');
const guestLogsRoutes = require('./routes/guestlogs');
const guestEntriesListRoutes = require('./routes/guest_entries_list');


// Route usage
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/lockedSysApp', lockedSysAppRoutes);
app.use('/api/securityStaff', securityStaffRoutes);
app.use('/api/accessLogs', accessLogsRoutes);
app.use('/api/guestRegistration', guestRegistrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/guestlogs', guestLogsRoutes);
app.use('/api/guest-entries-list', guestEntriesListRoutes);


// Start server (only once!)
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
