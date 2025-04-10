const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(bodyParser.json());

// File handling
const eventsFilePath = path.join(__dirname, 'events.json');
if (!fs.existsSync(eventsFilePath)) {
  fs.writeFileSync(eventsFilePath, JSON.stringify({ users: [] }, null, 2));
}

const readUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(eventsFilePath, 'utf8'));
    return data.users || [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(eventsFilePath, JSON.stringify({ users }, null, 2));
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const users = readUsers();

    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      userName: name,
      image: '/default-avatar.png',
      expertise: 'Professional',
      bio: '',
      skills: [],
      experience: [],
      createdAt: new Date()
    };

    users.push(user);
    writeUsers(users);

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userName: user.userName,
        image: user.image,
        expertise: user.expertise,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userName: user.userName,
        image: user.image,
        expertise: user.expertise,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

app.get('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, 'your-secret-key');
    const users = readUsers();
    const user = users.find(u => u.id === decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      userName: user.userName,
      image: user.image,
      expertise: user.expertise,
      bio: user.bio,
      skills: user.skills,
      experience: user.experience
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('User fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
