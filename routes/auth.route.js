const { Router } = require('express');
const { createUser,login } = require('../controllers/auth.controller')

const router=Router();

router.post('/api/user',createUser);
router.post('/api/login',login);


module.exports=router;