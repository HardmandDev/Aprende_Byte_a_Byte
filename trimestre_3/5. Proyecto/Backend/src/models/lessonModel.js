const pool = require('../db');

const getLessonById = async (id) => {
    const res = await pool.query(`
        SELECT * FROM lessons WHERE id = $1
        `,
        [id]
    )
    return res.rows[0];
};

// Used by the updateStatusLesson function of admin.controller.js
const updateStatusLesson = async (lessonId, lessonData) => {
    const { status, user_admin_id } = lessonData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            `UPDATE lessons SET status = $1, user_admin_id = $2 WHERE id = $3`,
            [status, user_admin_id, lessonId]
        );

        await client.query('COMMIT');
        return { id: lessonId, status };

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getLessonById,
    updateStatusLesson,
};