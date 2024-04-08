const pool = require('../db');

const getAllTestResults = async (req, res, next) => {
    try {
        const allTestResults = await pool.query(
            `SELECT * FROM test_results`);
        res.json(allTestResults.rows);
    } catch (error) {
        next(error)
    }
}

const getTestResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const testResult = await pool.query(
            `SELECT * FROM test_results 
                WHERE id = $1`,
            [id]);

        if (testResult.rows.length === 0) {
            return res.status(404).json({
                message: 'Test Result no encontrado'
            });
        }
        res.json(testResult.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createTestResult = async (req, res, next) => {
    const {
        id_user,
        id_course,
        id_lesson,
        test_name,
        test_description,
        test_result,
        test_code_url
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO test_results
                (id_user, id_course, id_lesson, test_name, test_description, test_result, test_code_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`,
            [id_user, id_course, id_lesson, test_name, test_description, test_result, test_code_url]
        )
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteTestResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE * FROM test_results 
                WHERE id = $1`,
            [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Test Result no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateTestResult = async (req, res, next) => {
    const { id } = req.params;
    const {
        id_user,
        id_course,
        id_lesson,
        test_name,
        test_description,
        test_result,
        test_code_url
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE test_results
                SET id_user = $1,
                    id_course = $2,
                    id_lesson = $3,
                    test_name = $4,
                    test_description = $5,
                    test_result = $6,
                    test_code_url = $7
                WHERE id = $8
                RETURNING *`,
            [id_user, id_course, id_lesson, test_name, test_description, test_result, test_code_url, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Test Result no encontrado'
            });
        }
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTestResults,
    getTestResult,
    createTestResult,
    deleteTestResult,
    updateTestResult
}