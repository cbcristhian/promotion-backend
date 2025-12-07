const { Router } = require('express');
const { createUser,login, checkStatus } = require('../controllers/auth.controller')
const { validateJWT } = require('../helpers/jwt');

const router=Router();

router.post('/api/user',createUser);
router.post('/api/login',login);
router.get('/api/check-status',validateJWT,checkStatus);


module.exports=router;