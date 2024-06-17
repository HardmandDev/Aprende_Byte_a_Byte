const pool = require('../db');

const getStudentCodeById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM student_code
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0]
}

const getAllStudentCode = async () => {
    const res = await pool.query(
        `
        SELECT * FROM student_code
        `
    )
    return res.rows
}

const createStudentCode = async (studentCode) => {
    const res = await pool.query(
        `
        INSERT INTO student_code (
            teacher_code_id,
            user_student_id,
            lesson_id,
            student_code
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            studentCode.teacher_code_id,
            studentCode.user_student_id,
            studentCode.lesson_id,
            studentCode.student_code
        ]
    );
    return res.rows[0]
}

const updateStudentCode = async (studentCode) => {
    const res = await pool.query(
        `
        UPDATE student_code
        SET
            teacher_code_id = $1,
            user_student_id = $2,
            lesson_id = $3,
            student_code = $4
        WHERE id = $5
        RETURNING *
        `,
        [
            studentCode.teacher_code_id,
            studentCode.user_student_id,
            studentCode.lesson_id,
            studentCode.student_code,
            studentCode.id
        ]
    );
    return res.rows[0]
}

const deleteStudentCode = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM student_code
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
};

module.exports = {
    getStudentCodeById,
    getAllStudentCode,
    createStudentCode,
    updateStudentCode,
    deleteStudentCode
}