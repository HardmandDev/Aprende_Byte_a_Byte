const pool = require('../db');

const getTeacherCodeById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM teacher_code
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0]
}

const getAllTeacherCode = async () => {
    const res = await pool.query(
        `
        SELECT * FROM teacher_code
        `
    )
    return res.rows
}

const createTeacherCode = async (teacherCode) => {
    const res = await pool.query(
        `
        INSERT INTO teacher_code (
            user_teacher_id,
            lesson_id,
            teacher_code,
            test_code
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            teacherCode.user_teacher_id,
            teacherCode.lesson_id,
            teacherCode.teacher_code,
            teacherCode.test_code
        ]
    );
    return res.rows[0]
}

const updateTeacherCode = async (teacherCode) => {
    const res = await pool.query(
        `
        UPDATE teacher_code
        SET
            user_teacher_id = $1,
            lesson_id = $2,
            teacher_code = $3,
            test_code = $4
        WHERE id = $5
        RETURNING *
        `,
        [
            teacherCode.user_teacher_id,
            teacherCode.lesson_id,
            teacherCode.teacher_code,
            teacherCode.test_code,
            teacherCode.id
        ]
    );
    return res.rows[0]
}

const deleteTeacherCode = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM teacher_code
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
};

module.exports = {
    getTeacherCodeById,
    getAllTeacherCode,
    createTeacherCode,
    updateTeacherCode,
    deleteTeacherCode
}