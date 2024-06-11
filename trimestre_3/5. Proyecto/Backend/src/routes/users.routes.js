const { Router } = require('express');
const router = Router();
const { createUser, updateUser } = require('../controllers/users.controller');
const { loginUser } = require('../controllers/auth.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

router.post('/register', createUser);
router.post('/login', loginUser);

// Rutas protegidas
router.put('/users/:id', authenticateToken, checkRole('support'), updateUser);

module.exports = router;
