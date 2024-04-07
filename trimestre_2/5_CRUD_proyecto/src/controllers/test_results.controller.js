const pool = require('../db');

const getAllTestResults = async (req, res) => {
    try {
        const allTestResults = await pool.query('SELECT * FROM test_results');
        res.json(allTestResults.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getTestResult = async (req, res) => {
    try {
        const { id } = req.params;
        const testResult = await pool.query(`SELECT * FROM test_results WHERE id = $1`, [id]);

        if (testResult.rows.length === 0) {
            return res.status(404).json({ message: 'Test Result not found' });
        }
        res.json(testResult.rows);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}
const createTestResult = async (req, res) => {
    const { id_user, id_course, id_lesson, test_name, test_description, test_result, test_code_url } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO test_results
            (id_user, id_course, id_lesson, test_name, test_description, test_result, test_code_url)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [id_user, id_course, id_lesson, test_name, test_description, test_result, test_code_url]
        )
        console.log(result.rows[0])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const deleteTestResult = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE * FROM test_results WHERE id = $1`, [id]);

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

const updateTestResult = (req, res) => {
    res.send('Actualizando un Test Result');
}

module.exports = {
    getAllTestResults,
    getTestResult,
    createTestResult,
    deleteTestResult,
    updateTestResult
}