const express = require('express');
const router = express.Router();
const captorController = require('../controllers/captorController');
const auth = require('../middleware/auth');

router.get('/', captorController.getAllCaptor);

router.get('/:region', captorController.getRegionOverEquiped);

router.post('/', auth.authenticateToken, auth.checkPoste('Agent technique') ,captorController.createCaptor);


module.exports = router;