
const {response,request} = require('express');
const bcrypt = require('bcrypt');
const { users } = require('../data/store/users');

const getResidents=(req=request,res=response)=>{
    const residents = users
    .filter((user) => user.role === 'RESIDENT')
    .map(({ password, passwordHash, ...safeUser }) => safeUser);
  
    res.status(200).json({
      count: residents.length,
      residents,
    });
}

const createResident=async(req=request,res=response)=>{
  const { name, email, password, apartmentNumber } = req.body;

  // Basic validation
  if (!name || !email || !password || !apartmentNumber) {
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
  // Check if apartmentNumber has an owner
  const apartmentAlreadyExist = users.find((u) => u.apartmentNumber === apartmentNumber);
  if (apartmentAlreadyExist) {
    return res.status(409).json({
      message: 'Apartment number already with another resident',
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
    registeredForCurrentRaffle: false,
    role: 'RESIDENT',
    apartmentNumber
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
      apartmentNumber: user.apartmentNumber
    },
  });
}

const patchResident=(req=request,res=response)=>{
  const {id} =req.params

    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(409).json({
        message: 'User not found',
      });
    }

    // Check if email already taken
    const exists = users.find((u) => u.email === req.body.email);
    if (exists) {
      return res.status(409).json({
        message: 'Email already exists in the system',
      });
    }

      // Check if apartmentNumber has an owner
    const apartmentAlreadyExist = users.find((u) => u.apartmentNumber === +req.body.apartmentNumber);
    if (apartmentAlreadyExist) {
      return res.status(409).json({
        message: 'Apartment number already with another resident',
      });
    }

    Object.assign(user,req.body)

    res.status(200).json({
      message:'User updated successfully',
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        apartmentNumber: user.apartmentNumber
      }
    })


}

module.exports={
  getResidents,createResident,patchResident
}