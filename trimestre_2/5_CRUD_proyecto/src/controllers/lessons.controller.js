const pool = require('../db');

const getAllLessons = async (req, res, next) => {
    try {
        const allLessons = await pool.query(
            `SELECT * FROM lessons
                RETURNING *`);
        res.json(allLessons.rows);
    } catch (error) {
        next(error)
    }
}

const getLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lessons = await pool.query(
            `SELECT * FROM lessons 
                WHERE id = $1
                RETURNING *`,
            [id]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({
                message: 'Lección no encontrada'
            });
        }
        res.json(lessons.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createLesson = async (req, res, next) => {
    const {
        id_course,
        title,
        content,
        lesson_order
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO lessons
                (id_course, title, content, lesson_order) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *`,
            [id_course, title, content, lesson_order]
        )
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const deleteLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE * FROM lessons 
                WHERE id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Lección no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateLesson = async (req, res, next) => {
    const { id } = req.params;
    const {
        id_course,
        title,
        content,
        lesson_order
    } = req.body

    try {
        const result = await pool.query(
            `UPDATE lessons
                SET id_course = $1, title = $2, content = $3, lesson_order = $4
                WHERE id = $5
                RETURNING *`,
            [id_course, title, content, lesson_order, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Lección no encontrado'
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllLessons,
    getLesson,
    createLesson,
    deleteLesson,
    updateLesson
}