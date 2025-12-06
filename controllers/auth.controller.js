const {response,request} = require('express');
const bcrypt = require('bcrypt');


const { users } = require('../data/store/users');

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email and password are required',
    });
  }

  // Check if user already exists
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(409).json({
      message: 'User already exists',
    });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
    role: role ?? 'RESIDENT',
    createdAt: new Date(),
  };

  // Save to in-memory store
  users.push(user);

  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};



module.exports={
    createUser
 }