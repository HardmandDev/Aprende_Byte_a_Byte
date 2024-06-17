const pool = require('../db');

const getStudentProgressById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM student_progress
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0]
}

const getAllStudentProgress = async () => {
    const res = await pool.query(
        `
        SELECT * FROM student_progress
        `
    )
    return res.rows
}

const createStudentProgress = async (student) => {
    const res = await pool.query(
        `
        INSERT INTO student_progress (
            user_student_id,
            course_id,
            lesson_id
        ) VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            student.user_student_id,
            student.course_id,
            student.lesson_id
        ]
    );
    return res.rows[0];
}

const updateStudentProgress = async (student) => {
    const res = await pool.query(
        `
        UPDATE student_progress
        SET
            lesson_approved = $1
        WHERE id = $2
        RETURNING *
        `,
        [
            student.lesson_approved,
            student.id
        ]
    );
    return res.rows[0]
}

const deleteStudentProgress = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM student_progress
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0]
}

module.exports = {
    getStudentProgressById,
    getAllStudentProgress,
    createStudentProgress,
    updateStudentProgress,
    deleteStudentProgress
}