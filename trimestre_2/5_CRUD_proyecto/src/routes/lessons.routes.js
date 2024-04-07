const { Router } = require('express');
const {
    getAllLessons,
    getLesson,
    createLesson,
    deleteLesson,
    updateLesson,
} = require('../controllers/lessons.controller');

const router = Router();

router.get('/lessons', getAllLessons);

router.get('/lessons/:id', getLesson);

router.post('/lessons', createLesson);

router.delete('/lessons/:id', deleteLesson);

router.put('/lessons/:id', updateLesson);

module.exports = router;