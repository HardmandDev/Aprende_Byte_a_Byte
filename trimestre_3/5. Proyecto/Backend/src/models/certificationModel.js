const pool = require('../db');

const getCertificationById = async (id) => {
    const res = await pool.query(
        `
        SELECT * FROM certifications
        WHERE id = $1
        `,
        [id]
    )
    return res.rows[0]
}

const getAllCertifications = async () => {
    const res = await pool.query(
        `
        SELECT * FROM certifications
        `
    )
    return res.rows
}

const createCertification = async (test) => {
    const res = await pool.query(
        `
        INSERT INTO certifications (
            user_student_id,
            course_id
        )
        VALUES ($1, $2)
        RETURNING *
        `,
        [
            test.user_student_id,
            test.course_id
        ]
    );
    return res.rows[0];
};

const updateCertification = async (test) => {
    const res = await pool.query(
        `
        UPDATE certifications
        SET
            certificate_obtained = $1
            certification_url = $2
        WHERE id = $3
        `,
        [
            test.certificate_obtained,
            test.certification_url,
            test.id
        ]
    );
    return res.rows[0]
}

const deleteCertification = async (id) => {
    const res = await pool.query(
        `
        DELETE FROM certifications
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0]
}


module.exports = {
    getCertificationById,
    getAllCertifications,
    createCertification,
    updateCertification,
    deleteCertification
}