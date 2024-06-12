const { Router } = require('express');
const router = Router();

const { createCourse } = require('../controllers/teacher.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

router.use(authenticateToken, checkRole('teacher'));

router.post('/create-course', createCourse);


module.exports = router;