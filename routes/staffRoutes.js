const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const auth= require('../middleware/auth');


router.get('/', auth.authenticateToken ,staffController.getStaffByToken);

router.get('/:nomVille/:poste', staffController.getStaff);

router.post('/', auth.authenticateToken, auth.checkPoste('Agent technique'), staffController.createStaff);

router.post('/:mailAgent', staffController.login);

module.exports = router;