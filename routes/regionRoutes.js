const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');
const auth = require('../middleware/auth');


router.get('/', regionController.getAllRegion);

router.get('/:nomRegion', regionController.getIdRegionByName);

router.post('/', auth.authenticateToken, auth.checkPoste('Directeur'), regionController.createRegion);

module.exports = router;