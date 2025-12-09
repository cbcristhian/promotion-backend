const { Router } = require('express');
const {getResidents, createResident, patchResident} =require('../controllers/resident.controller')

const { validateJWT } = require('../helpers/jwt');

const router=Router();

router.get('/api/get-residents',validateJWT,getResidents);
router.post('/api/resident',validateJWT,createResident);
router.patch('/api/resident/:id',validateJWT,patchResident);


module.exports=router;