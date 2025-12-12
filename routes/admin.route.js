const { Router } = require('express');
const { runRaffle, getLatestRaffle } = require('../controllers/admin.controller');
const { validateJWT } = require('../helpers/jwt');

const router=Router();

router.post('/api/raffle',validateJWT,runRaffle);
router.get('/api/latest-raffle',validateJWT,getLatestRaffle);


module.exports=router;