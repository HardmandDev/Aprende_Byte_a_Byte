const { Router } = require('express');
const router = Router();

const {
    createStudentCode,
    getAllStudentCode,
    getStudentCodeById,
    updateStudentCode,
    deleteStudentCode
} = require('../controllers/student_code.controller')

const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole')

router.use(authenticateToken, checkRole('teacher', 'admin', 'student'));

router.get('/', getAllStudentCode)

router.get('/:id', getStudentCodeById)

router.post('/', createStudentCode)

router.put('/:id', updateStudentCode)

router.delete('/:id', deleteStudentCode)

module.exports = router;
