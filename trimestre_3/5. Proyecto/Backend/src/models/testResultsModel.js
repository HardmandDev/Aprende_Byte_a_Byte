const pool = require('../db');

const getTestResultsById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM test_results
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0]
}

const getAllTestResults = async () => {
    const res = await pool.query(
        `
        SELECT * FROM test_results
        `
    )
    return res.rows
}

const createTestResult = async (test) => {
    const res = await pool.query(
        `
        INSERT INTO test_results (
            user_student_id,
            lesson_id,
            student_code_id
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            test.user_student_id,
            test.lesson_id,
            test.student_code_id
        ]
    );
    return res.rows[0];
};

const updateTestResult = async (test) => {
    const res = await pool.query(
        `
        UPDATE test_results
        SET
            test_result = $1
        WHERE id = $2
        `,
        [
            test.test_result,
            test.id
        ]
    );
    return res.rows[0]
}

const deleteTestResult = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM test_results
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0]
}


module.exports = {
    getTestResultsById,
    getAllTestResults,
    createTestResult,
    updateTestResult,
    deleteTestResult
}