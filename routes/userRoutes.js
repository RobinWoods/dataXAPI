const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth= require('../middleware/auth');

// GET /api/users
/*router.get('/', userController.getAllUsers);

// GET /api/users/:id
router.get('/:id',auth.authenticateToken, auth.checkRole("membre"), userController.getUserById);

// POST /api/users
router.post('/', auth.authenticateToken, auth.checkRole("admin"), userController.createNewUser);

// PUT /api/users/:id
router.put('/:id', auth.authenticateToken, auth.checkRole("membre"), userController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', auth.authenticateToken, auth.checkRole("admin"), userController.deleteUser);

router.post('/login', userController.login);
*/
module.exports = router;