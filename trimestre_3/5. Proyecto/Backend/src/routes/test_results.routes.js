const { Router } = require('express');
const router = Router();

const {
    createTestResult,
    getTestResultById,
    updateTestResult
} = require('../controllers/test_results.controller')

const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole');

router.use(authenticateToken);

// router.get('/', checkRole('teacher', 'admin'), getAllTestResults)

router.get('/:id', checkRole('teacher', 'admin', 'student'), getTestResultById)

router.post('/', checkRole('teacher', 'admin', 'student'), createTestResult)

router.put('/:id', checkRole('teacher', 'admin', 'student'), updateTestResult)

// router.delete('/:id', checkRole('teacher', 'admin'), deleteTestResult)

module.exports = router;
