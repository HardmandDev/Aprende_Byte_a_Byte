const { Router } = require('express');
const {
    getAllStudentProgress,
    getStudentProgress,
    createStudentProgress,
    deleteStudentProgress,
    updateStudentProgress,
} = require('../controllers/student_progress.controller');

const router = Router();

router.get('/student-progress', getAllStudentProgress);

router.get('/student-progress/:id', getStudentProgress);

router.post('/student-progress', createStudentProgress);

router.delete('/student-progress/:id', deleteStudentProgress);

router.put('/student-progress/:id', updateStudentProgress);

module.exports = router;