const { Router } = require('express');
const {getResidents, createResident, patchResident, residentRaffleHistory,registerRaffle} =require('../controllers/resident.controller')

const { validateJWT } = require('../helpers/jwt');

const router=Router();

router.get('/api/get-residents',validateJWT,getResidents);
router.post('/api/resident',validateJWT,createResident);
router.patch('/api/resident/:id',validateJWT,patchResident);
router.get('/api/resident-history',validateJWT,residentRaffleHistory);
router.patch('/api/register-raffle',validateJWT,registerRaffle);


module.exports=router;