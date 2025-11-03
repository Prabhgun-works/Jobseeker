const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀Server running on port ${PORT}`);
});

module.exports = app;
