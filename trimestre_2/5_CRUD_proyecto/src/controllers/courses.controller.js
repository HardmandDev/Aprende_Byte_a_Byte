const pool = require('../db');

const getAllCourses = async (req, res, next) => {
    try {
        const allCourses = await pool.query(
            `SELECT * FROM "ABB".courses`
        );
        res.json(allCourses.rows);
    } catch (error) {
        next(error)
    }
}

const getCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await pool.query(
            `SELECT * FROM "ABB".courses 
                WHERE id = $1`,
            [id]
        );
        if (course.rows.length === 0) {
            return res.status(404).json({
                message: 'Curso no encontrado'
            });
        }
        res.json(course.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createCourse = async (req, res, next) => {
    const {
        id_author,
        course_name,
        description,
        image_url,
        id_level
    } = req.body

    try {
        const result = await pool.query(
            `INSERT INTO "ABB".courses
                (id_author, course_name, description, image_url, id_level) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`,
            [id_author, course_name, description, image_url, id_level]
        )
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE * FROM "ABB".courses 
                WHERE id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Curso no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateCourse = async (req, res, next) => {
    const { id } = req.params;
    const {
        id_author,
        course_name,
        description,
        image_url,
        id_level
    } = req.body

    try {
        const result = await pool.query(
            `UPDATE "ABB".courses 
                SET id_author = $1, 
                    course_name = $2, 
                    description = $3, 
                    image_url = $4, 
                    id_level = $5
                WHERE id = $6
                RETURNING *`,
            [id_author, course_name, description, image_url, id_level, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Curso no encontrado'
            })
        }
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
}