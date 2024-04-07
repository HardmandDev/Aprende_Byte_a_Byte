const pool = require('../db');

const getAllTestResults = async (req, res) => {
    try {
        const allTestResults = await pool.query(
            `SELECT * FROM test_results
                RETUNIRNG *`);
        res.json(allTestResults.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getTestResult = async (req, res) => {
    try {
        const { id } = req.params;
        const testResult = await pool.query(
            `SELECT * FROM test_results 
                WHERE id = $1
                RETURNING *`,
            [id]);

        if (testResult.rows.length === 0) {
            return res.status(404).json({
                message: 'Test Result no encontrado'
            });
        }
        res.json(testResult.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const createTestResult = async (req, res) => {
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
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const deleteTestResult = async (req, res) => {
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
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const updateTestResult = async (req, res) => {
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
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllTestResults,
    getTestResult,
    createTestResult,
    deleteTestResult,
    updateTestResult
}