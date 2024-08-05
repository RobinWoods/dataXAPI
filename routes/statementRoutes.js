const express = require('express');
const router = express.Router();
const statementController = require('../controllers/statementController');
const auth = require('../middleware/auth.js');

router.get('/', statementController.getAllStatements);

router.get('/:annee', statementController.getTotalEmmissionGreenHouse);

router.get('/:nomRegion/:annee', statementController.getTotalEmission);

router.post('/', auth.authenticateToken, auth.checkPoste('Agent technique'), statementController.createStatement);



module.exports = router;