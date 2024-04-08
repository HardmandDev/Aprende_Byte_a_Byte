const { Router } = require('express');
const {
    getAllTestResults,
    getTestResult,
    createTestResult,
    deleteTestResult,
    updateTestResult
} = require('../controllers/test_results.controller');

const router = Router();

router.get('/test-results', getAllTestResults);

router.get('/test-results/:id', getTestResult);

router.post('/test-results', createTestResult);

router.delete('/test-results/:id', deleteTestResult);

router.put('/test-results/:id', updateTestResult);

module.exports = router;