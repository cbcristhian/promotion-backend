const { Router } = require('express');
const {getResidents, createResident, putResident, residentRaffleHistory} =require('../controllers/resident.controller')

const { validateJWT } = require('../helpers/jwt');

const router=Router();

router.get('/api/get-residents',validateJWT,getResidents);
router.post('/api/resident',validateJWT,createResident);
router.put('/api/resident/:id',validateJWT,putResident);
router.get('/api/resident-history',validateJWT,residentRaffleHistory);


module.exports=router;