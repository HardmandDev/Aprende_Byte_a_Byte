const pool = require('../db');



const createCourse = async ({ user_teacher_id, course_name, description, image_url, level_id }) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO courses (
                user_teacher_id,
                course_name, 
                description, 
                image_url,
                level_id
            ) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [user_teacher_id, course_name, description, image_url, level_id]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating course:', error);
        throw new Error('Error creating course: ' + error.message);
    }
};

const getCourseById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM courses 
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0];
};

const getCourses = async () => {
    const res = await pool.query(
        `
        SELECT * FROM courses
        `
    )
    return res.rows;
};

const updateCourse = async (course) => {
    const res = await pool.query(
        `
        UPDATE courses SET
            user_teacher_id = $1,
            course_name = $2, 
            description = $3, 
            image_url = $4,
            level_id = $5
        WHERE id = $6
        RETURNING *
        `,
        [
            course.user_teacher_id,
            course.course_name,
            course.description,
            course.image_url,
            course.level_id,
            course.id
        ]
    );
    return res.rows[0];
};

// Used by the updateStatusCourse function of admin.controller.js
// aprobado = approved
// rechazado = rejected
// pendiente = pending
const updateStatusCourse = async (courseId, courseData) => {
    const { status, user_admin_id } = courseData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            `UPDATE courses SET status = $1, user_admin_id = $2 WHERE id = $3`,
            [status, user_admin_id, courseId]
        );

        await client.query('COMMIT');
        return { id: courseId, status };

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const deleteCourse = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM courses 
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
};

module.exports = {
    getCourseById,
    getCourses,
    createCourse,
    updateCourse,
    updateStatusCourse,
    deleteCourse
};