const { Router } = require('express');
const router = Router();

const { createUser,
        updateUser,
        deleteUser,
        getUsers,
        getUserById
} = require('../controllers/users.controller');
const { loginUser } = require('../controllers/auth.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

router.post('/register', createUser);
router.post('/login', loginUser);

// Rutas protegidas
router.put('/users/:id', authenticateToken, checkRole('support'), updateUser);
router.delete('/users/:id', authenticateToken, checkRole('support'), deleteUser);
router.get('/users', authenticateToken, checkRole('support'), getUsers);
router.get('/users/:id', authenticateToken, checkRole('support'), getUserById);

module.exports = router;
