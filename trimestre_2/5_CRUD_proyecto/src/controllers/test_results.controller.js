const pool = require('../db');

const getAllTestResults = async (req, res, next) => {
    try {
        const allTestResults = await pool.query(
            `SELECT * FROM "ABB".test_results`);
        res.json(allTestResults.rows);
    } catch (error) {
        next(error)
    }
}

const getTestResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const testResult = await pool.query(
            `SELECT * FROM "ABB".test_results 
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
        id_lesson,
        code,
        test
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO "ABB".test_results
                (id_user, id_lesson, code, test)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
            [id_user, id_lesson, code, test]
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
            `DELETE * FROM "ABB".test_results 
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
        id_lesson,
        code,
        test
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE "ABB".test_results
                SET id_user = $1,
                    id_lesson = $2,
                    code = $3,
                    test = $4
                WHERE id = $5
                RETURNING *`,
            [id_user, id_lesson, code, test, id]
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