const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/sectorController');

router.get('/', sectorController.getAllSector);

router.get('/:nomRegion', sectorController.getSectorPollution);

module.exports = router;