const bodyParser = require('body-parser');
const express = require('express');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

// Updated CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(authRoutes);
app.use('/events', eventRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ 
    message: message,
    error: process.env.NODE_ENV === 'development' ? error : undefined
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
