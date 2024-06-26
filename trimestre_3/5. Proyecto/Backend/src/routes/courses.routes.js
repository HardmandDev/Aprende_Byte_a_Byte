const { Router } = require('express');
const router = Router();

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../controllers/courses.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');
const { upload } = require('../middlewares/multerMiddleware');

// Middleware para autenticación y roles
router.use(authenticateToken, checkRole('student', 'teacher', 'support', 'admin'));

// Ruta para crear un curso con imagen adjunta
router.post('/create', upload, createCourse);

// Otras rutas para cursos
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
