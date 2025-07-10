const express = require('express');
const { add, get } = require('../data/user');
const { createJSONToken, isValidPassword, checkAuth } = require('../util/auth');
const { isValidEmail, isValidText } = require('../util/validation');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email.';
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = 'Email exists already.';
      }
    } catch (error) {
      // If error is NotFoundError, it means user doesn't exist, which is what we want
      // Only set error if it's not a NotFoundError
      if (error.constructor.name !== 'NotFoundError') {
        errors.email = 'Error checking email availability.';
      }
    }
  }

  if (!isValidText(data.password, 6)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }

  if (!isValidText(data.userName, 2)) {
    errors.userName = 'Username must be at least 2 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'User signup failed due to validation errors.',
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const { accessToken, refreshToken } = createJSONToken(createdUser.email);
    
    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({ 
      message: 'User created.', 
      user: createdUser, 
      accessToken 
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Basic email validation for login (less strict than signup)
  if (!email || !email.includes('@')) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: { credentials: 'Invalid email or password entered.' },
    });
  }

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: { credentials: 'Invalid email or password entered.' },
    });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: { credentials: 'Invalid email or password entered.' },
    });
  }

  const { accessToken, refreshToken } = createJSONToken(email);
  
  // Set refresh token in HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({ 
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      userName: user.userName
    }
  });
});

router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } = createJSONToken(refreshToken.email);
    
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

router.get('/user', checkAuth, async (req, res) => {
  try {
    const user = await get(req.token.email);
    // Remove password from user data
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(401).json({ message: 'Could not fetch user data.' });
  }
});

module.exports = router;
