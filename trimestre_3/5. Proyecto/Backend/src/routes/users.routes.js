const { Router } = require('express');
const router = Router();

const {
    createUser,
    updateUser,
    updateUserRole,
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

router.get('/', checkRole('admin', 'support', 'teacher'), getUsers);

router.get('/:id', checkRole('admin', 'support', 'teacher', 'student'), getUserById);

router.put('/:id', checkRole('admin', 'support', 'teacher', 'student'), updateUser);

router.put('/:id/role', checkRole('admin', 'support'), updateUserRole);

router.delete('/:id', checkRole('admin', 'support', 'teacher', 'student'), deleteUser);

module.exports = router;
