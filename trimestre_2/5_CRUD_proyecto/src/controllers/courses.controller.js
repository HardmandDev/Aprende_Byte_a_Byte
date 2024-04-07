const pool = require('../db');

const getAllCourses = async (req, res, next) => {
    try {
        const allCourses = await pool.query(
            `SELECT * FROM courses
                RETURNING *`
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
            `SELECT * FROM course 
                WHERE id = $1
                RETURNING *`,
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
        name,
        description,
        image_url,
        level
    } = req.body

    try {
        const result = await pool.query(
            `INSERT INTO courses
                (name, description, image_url, level) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *`,
            [name, description, image_url, level]
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
            `DELETE * FROM courses 
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
        name,
        description,
        image_url,
        level
    } = req.body

    try {
        const result = await pool.query(
            `UPDATE courses 
                SET name = $1, description = $2, image_url = $3, level = $4 
                WHERE id = $5 
                RETURNING *`,
            [name, description, image_url, level, id]
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