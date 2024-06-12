const pool = require('../db');

// Used by the createCourse function of teacher.controller.js
const createCourse = async (course, user_id) => {
    const res = await pool.query(
        `INSERT INTO courses (
            user_id,
            course_name, 
            description, 
            image_url,
            level_id
            ) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
        [user_id, course.course_name, course.description, course.image_url, course.level_id]
    );
    return res.rows[0];
};

// Used by the approveCourse, rejectCourse and pendingCourse functions of admin.controller.js
const updateCourseStatus = async (courseId, status) => {
    const res = await pool.query(
        'UPDATE courses SET status = $1 WHERE id = $2 RETURNING *',
        [status, courseId]
    );
    return res.rows[0];
};

module.exports = {
    createCourse,
    updateCourseStatus,
};