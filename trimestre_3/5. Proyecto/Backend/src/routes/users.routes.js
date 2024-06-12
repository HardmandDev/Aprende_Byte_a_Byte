const { Router } = require('express');
const router = Router();

const { 
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
} = require('../controllers/users.controller');
const { loginUser } = require('../controllers/auth.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser);

// Private routes
router.use(authenticateToken)
router.get('/users', checkRole('support' || 'admin'), getUsers);
router.put('/users/:id', checkRole('support' || 'admin' || 'student'), updateUser);
router.delete('/users/:id', checkRole('support' || 'admin' || 'student'), deleteUser);
router.get('/users/:id', checkRole('support' || 'admin' || 'student'), getUserById);

module.exports = router;
