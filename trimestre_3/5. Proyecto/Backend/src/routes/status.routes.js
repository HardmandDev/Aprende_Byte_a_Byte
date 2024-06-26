const { Router } = require('express');
const router = Router();

const {
    updateStatusCourse,
    updateStatusLesson
} = require('../controllers/status.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

router.use(authenticateToken);

router.put('/:course_id', checkRole('admin'), updateStatusCourse);

router.put('/lesson/:lesson_id', checkRole('admin'), updateStatusLesson);

module.exports = router;