const testResultsModel = require('../models/testResultsModel');

const createTestResult = async (req, res) => {
    try {
        const {
            user_student_id,
            lesson_id,
            student_code_id
        } = req.body;

        const newTestResult = await testResultsModel.createTestResult({
            user_student_id,
            lesson_id,
            student_code_id
        });

        res.status(201).json(newTestResult);
    } catch (error) {
        res.status(500).json({ error: 'Error creating test result', details: error.message })
    }
}

const getTestResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const testResult = await testResultsModel.getTestResultsById(id);

        if (testResult) {
            res.status(200).json(testResult);
        } else {
            res.status(404).json({ message: 'Test result not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching test result' })
    }
}

const updateTestResult = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            test_result
        } = req.body;

        const testResult = await testResultsModel.getTestResultsById(id);

        if (id) {
            testResult.id = id;
        }
        if (test_result) {
            testResult.test_result = test_result;
        }

        const updateTestResult = await testResultsModel.updateTestResult(testResult);

        res.status(200).json(updateTestResult);

    } catch (error) {
        res.status(500).json({ error: 'Error updating test result', details: error.message })
    }
}

module.exports = {
    createTestResult,
    getTestResultById,
    updateTestResult
}