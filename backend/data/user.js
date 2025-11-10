const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  
  if (!storedData.users) {
    storedData.users = [];
  }

  // Create user object with all fields
  const userData = {
    id: userId,
    userName: data.userName,
    email: data.email,
    password: hashedPw,
    image: data.image || '',
    expertise: data.expertise || '',
    qualifications: data.qualifications || '',
    experience: data.experience || ''
  };

  storedData.users.push(userData);
  await writeData(storedData);
  
  // Return user data without password
  const { password: _, ...userWithoutPassword } = userData;
  return userWithoutPassword;
}

async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  return user;
}

exports.add = add;
exports.get = get;
