const { Router } = require('express');
const {
    getAllLessons,
    getLesson,
    createLesson,
    deleteLesson,
    updateLesson,
} = require('../controllers/lessons.controller');

const router = Router();

router.get('/users', getAllLessons);

router.get('/users/:id', getLesson);

router.post('/users', createLesson);

router.delete('/users/:id', deleteLesson);

router.put('/users/:id', updateLesson);

module.exports = router;