const { Router } = require('express');
const router = Router();

const {
    createStudentProgress,
    getAllStudentProgress,
    getStudentProgressById,
    updateStudentProgress,
    deleteStudentProgress
} = require('../controllers/student_progress.controller')

const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole')

router.use(authenticateToken);

router.get('/', checkRole('teacher', 'admin'), getAllStudentProgress)

router.get('/:id', checkRole('teacher', 'admin', 'student'), getStudentProgressById)

router.post('/', checkRole('teacher', 'admin', 'student'), createStudentProgress)

router.put('/:id', checkRole('teacher', 'admin', 'student'), updateStudentProgress)

router.delete('/:id', checkRole('teacher', 'admin'), deleteStudentProgress)

module.exports = router;
