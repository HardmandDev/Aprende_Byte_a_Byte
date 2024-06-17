const { Router } = require('express');
const router = Router();

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/courses.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

router.use(authenticateToken, checkRole('teacher', 'admin'));

router.post('/create', createCourse);

router.get('/', getCourses);

router.get('/:id', getCourseById);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse)

module.exports = router;