const { Router } = require('express');
const router = Router();

const {
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
} = require('../controllers/lessons.controller')

const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole')

router.use(authenticateToken, checkRole('teacher', 'admin'));

router.get('/', getLessons)

router.get('/:id', getLessonById)

router.post('/', createLesson)

router.put('/:id', updateLesson)

router.delete('/:id', deleteLesson)

module.exports = router;

