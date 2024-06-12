const pool = require('../db');

// Used by the approveCourse, rejectCourse and pendingCourse functions of admin.controller.js
const updateCourseStatus = async (courseId, status) => {
    const res = await pool.query(
        'UPDATE courses SET status = $1 WHERE id = $2 RETURNING *',
        [status, courseId]
    );
    return res.rows[0];
};

module.exports = {
    updateCourseStatus,
};