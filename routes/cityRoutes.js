const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const auth= require('../middleware/auth');


router.get('/', cityController.getAllCities);

router.post('/', auth.authenticateToken, auth.checkPoste("Admin"), cityController.createCity);

module.exports = router;