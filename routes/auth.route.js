const { Router } = require('express');
const { createUser } = require('../controllers/auth.controller')

const router=Router();

router.post('/api/user',createUser);


module.exports=router;