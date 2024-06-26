const pool = require('../db');

const getLessonById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM lessons 
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0];
};

const getLessons = async () => {
    const res = await pool.query(
        `
        SELECT * FROM lessons
        `
    )
    return res.rows;
};

const createLesson = async (lesson) => {
    const res = await pool.query(
        `
        INSERT INTO lessons (
            user_teacher_id,
            course_id,
            lesson_name,
            lesson_order,
            task,
            details
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
            lesson.user_teacher_id,
            lesson.course_id,
            lesson.lesson_name,
            lesson.lesson_order,
            lesson.task,
            lesson.details
        ]
    );
    return res.rows[0]

}

const updateLesson = async (lesson) => {
    const res = await pool.query(
        `
        UPDATE lessons SET
            user_teacher_id = $1,
            course_id = $2,
            lesson_name = $3,
            lesson_order = $4,
            task = $5,
            details = $6
        WHERE id = $7
        RETURNING *
        `,
        [
            lesson.user_teacher_id,
            lesson.course_id,
            lesson.lesson_name,
            lesson.lesson_order,
            lesson.task,
            lesson.details,
            lesson.id
        ]
    );
    return res.rows[0]
}

// Used by the updateStatusLesson function of admin.controller.js
const updateStatusLesson = async (lessonId, lessonData) => {
    const { status, user_admin_id } = lessonData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            `
            UPDATE lessons SET
                status = $1,
                user_admin_id = $2
            WHERE id = $3
            `,
            [status, user_admin_id, lessonId]
        );

        await client.query('COMMIT')
        return { id: lessonId, status }
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const deleteLesson = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM lessons 
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
};

module.exports = {
    getLessonById,
    getLessons,
    createLesson,
    updateLesson,
    updateStatusLesson,
    deleteLesson,
};