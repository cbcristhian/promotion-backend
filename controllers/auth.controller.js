const {response,request} = require('express');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../helpers/jwt')

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

const login=async(req=request,res=response)=>{
  const {email,password}=req.body
  try{
    //Validate if user exist
    const user = users.find((u) => u.email === email);
      if(!user){
          return res.status(400).json({
              msg:'User does not exist'
          })
      }
      //Validate password
      const validPassword = bcrypt.compareSync(password,user.password);
      if(!validPassword){
          return res.status(400).json({
              msg:'Password is incorrect'
          });
      }
      
      const token = await generateJWT(user.id);

      res.status(200).json({
         user,
         token
      })
  }catch(error){
      console.log(error);
      return res.status(500).json({
          msg:'Server Error'
      })
  }
}

const checkStatus=async(req=request,res=response)=>{
  const token = await generateJWT(req.user.id);
  res.status(200).json({
    user:req.user,
    token
  })
}



module.exports={
    createUser,login,checkStatus
 }