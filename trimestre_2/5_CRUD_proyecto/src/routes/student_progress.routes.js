const { Router } = require('express');
const {
    getAllStudentProgress,
    getStudentProgress,
    createStudentProgress,
    deleteStudentProgress,
    updateStudentProgress,
} = require('../controllers/student_progress.controller');

const router = Router();

router.get('/student-progess', getAllStudentProgress);

router.get('/student-progess/:id', getStudentProgress);

router.post('/student-progess', createStudentProgress);

router.delete('/student-progess/:id', deleteStudentProgress);

router.put('/student-progess/:id', updateStudentProgress);

module.exports = router;