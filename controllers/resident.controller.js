
const {response,request} = require('express');
const bcrypt = require('bcrypt');
const { users } = require('../data/store/users');
const { raffleHistory } = require('../data/store/raffle-history');

const getResidents=(req=request,res=response)=>{
    const residents = users
    .filter((user) => user.role === 'RESIDENT')
    .map(({ password, passwordHash, ...safeUser }) => safeUser);
  
    return res.status(200).json({
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
  const apartmentAlreadyExist = users.find((u) => u.apartmentNumber === +apartmentNumber);
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
    password:passwordHash,
    registeredForCurrentRaffle: false,
    role: 'RESIDENT',
    apartmentNumber
  };

  // Save to in-memory store
  users.push(user);

  return res.status(201).json({
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

const patchResident = (req = request, res = response) => {
  const { id } = req.params;

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  // Email validation (only if changed)
  if (req.body.email && req.body.email !== user.email) {
    const emailTaken = users.find(
      (u) => u.email === req.body.email && u.id !== id
    );

    if (emailTaken) {
      return res.status(409).json({
        message: 'Email already exists in the system',
      });
    }
  }

    // Apartment validation (only if changed)
    if (
      req.body.apartmentNumber !== undefined &&
      req.body.apartmentNumber !== user.apartmentNumber
    ) {
    const apartmentTaken = users.find(
      (u) =>
        u.apartmentNumber === +req.body.apartmentNumber &&
        u.id !== id
    );

    if (apartmentTaken) {
      return res.status(409).json({
        message: 'Apartment number already with another resident',
      });
    }
  }

  Object.assign(user, req.body);

  return res.status(200).json({
    message: 'User updated successfully',
    user:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      apartmentNumber: user.apartmentNumber,
    },
  });
};


const residentRaffleHistory=(req=request,res=response)=>{
  const residentId=req.user.id

  // Validate resident
  const resident = users.find(u => u.id === residentId && u.role === "RESIDENT");
  if (!resident) {
    return res.status(404).json({ message: "Resident not found" });
  }

  // Build history
  const history = raffleHistory.map(raffle => {
    const { executedAt, assignments, unassignedResidents } = raffle;

    // Check if resident was assigned a spot in this raffle
    const assignedEntry = assignments.find(a => a.residentId === residentId);

    if (assignedEntry) {
      return {
        executedAt,
        residentId,
        name: resident.name,
        apartmentNumber: resident.apartmentNumber,
        parkingSpotId: assignedEntry.parkingSpotId
      };
    }

    // Not assigned (Loser on raffle)
    if (unassignedResidents.includes(residentId)) {
      return {
        executedAt,
        residentId,
        name: resident.name,
        apartmentNumber: resident.apartmentNumber,
        parkingSpotId: null
      };
    }

    // Resident didn't participate in this raffle, skipping
    return null;
  })
  .filter(entry => entry !== null)
  .sort((a, b) => new Date(b.executedAt) - new Date(a.executedAt));
  return res.json({
    registeredForRaffle:resident.registeredForCurrentRaffle,
    residentHistory:history});

}

const registerRaffle=(req=request,res=response)=>{
  const residentId=req.user.id
  // Validate resident
  const resident = users.find(u => u.id === residentId && u.role === "RESIDENT");
  if (!resident) {
    return res.status(404).json({ message: "Resident not found" });
  }
  resident.registeredForCurrentRaffle=!resident.registeredForCurrentRaffle


  return res.status(200).json(`Resident ${resident.name} status for raffle was changed.`)

}

const deleteResident=(req=request,res=response)=>{
  const { id } = req.params;

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const deletedUser = users[index];

  users.splice(index, 1);

  return res.status(200).json({
    message: `Resident ${deletedUser.email} deleted successfully`,
    user: {
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
      apartmentNumber: deletedUser.apartmentNumber,
    },
  });

}

module.exports={
  getResidents,createResident,patchResident,residentRaffleHistory, registerRaffle,deleteResident
}