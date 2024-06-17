const { Router } = require('express');
const router = Router();

const {
    createTeacherCode,
    getAllTeacherCode,
    getTeacherCodeById,
    updateTeacherCode,
    deleteTeacherCode
} = require('../controllers/teacher_code.controller')

const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole')

router.use(authenticateToken);

router.get('/', checkRole('teacher', 'admin', 'student'), getAllTeacherCode)

router.get('/:id', checkRole('teacher', 'admin', 'student'), getTeacherCodeById)

router.post('/', checkRole('teacher', 'admin'), createTeacherCode)

router.put('/:id', checkRole('teacher', 'admin'), updateTeacherCode)

router.delete('/:id', checkRole('teacher', 'admin'), deleteTeacherCode)

module.exports = router;
