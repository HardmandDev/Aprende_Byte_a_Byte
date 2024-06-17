const pool = require('../db');

const getCourseById = async (id) => {
    const res = await pool.query(`
        SELECT * FROM courses WHERE id = $1
        `,
        [id]
    )
    return res.rows[0];
};

const getCourses = async () => {
    const res = await pool.query(`
        SELECT * FROM courses
        `
    )
    return res.rows;
};

// Used by the createCourse function of teacher.controller.js
const createCourse = async (course, user_teacher_id) => {
    const res = await pool.query(
        `INSERT INTO courses (
            user_teacher_id,
            course_name, 
            description, 
            image_url,
            level_id
            ) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
        [user_teacher_id, course.course_name, course.description, course.image_url, course.level_id]
    );
    return res.rows[0];
};

const updateCourse = async (course, id) => {
    const res = await pool.query(
        `UPDATE courses SET
            user_teacher_id = $1,
            course_name = $2, 
            description = $3, 
            image_url = $4,
            level_id = $5
            WHERE id = $6
            RETURNING *`,
        [course.user_teacher_id, course.course_name, course.description, course.image_url, course.level_id, id]
    );
    return res.rows[0];
};

// Used by the updateStatusCourse function of admin.controller.js
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

const deleteCourse = async (courseId) => {
    const res = await pool.query(
        `DELETE FROM courses WHERE id = $1`,
        [courseId]
    );
    return res.rows[0];
};

module.exports = {
    getCourseById,
    getCourses,
    createCourse,
    updateCourse,
    updateStatusCourse,
    deleteCourse,
};