const { Router } = require('express');
const {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse,
} = require('../controllers/courses.controller');

const router = Router();

router.get('/courses', getAllCourses);

router.get('/courses/:id', getCourse);

router.post('/courses', createCourse);

router.delete('/courses/:id', deleteCourse);

router.put('/courses/:id', updateCourse);

module.exports = router;