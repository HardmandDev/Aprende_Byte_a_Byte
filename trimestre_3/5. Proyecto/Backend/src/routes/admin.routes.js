const { Router } = require('express');
const router = Router();

const {
    approveCourse,
    rejectCourse,
    pendingCourse
} = require('../controllers/admin.controller');

const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkRole } = require('../middlewares/checkRole');

router.use(authenticateToken, checkRole('admin'));

router.post('/approve-course/:id', approveCourse);
router.post('/reject-course/:id', rejectCourse);
router.post('/pending-course/:id', pendingCourse);

module.exports = router;