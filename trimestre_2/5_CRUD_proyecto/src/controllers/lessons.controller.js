const pool = require('../db');

const getAllLessons = async (req, res, next) => {
    try {
        const allLessons = await pool.query(
            `SELECT * FROM "ABB".lessons`);
        res.json(allLessons.rows);
    } catch (error) {
        next(error)
    }
}

const getLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lesson = await pool.query(
            `SELECT * FROM "ABB".lessons 
                WHERE id = $1`,
            [id]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({
                message: 'Lección no encontrada'
            });
        }
        res.json(lesson.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createLesson = async (req, res, next) => {
    const {
        id_course,
        id_author,
        lesson_order,
        lesson_name,
        content,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO "ABB".lessons
                (id_course, title, content, lesson_order) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`,
            [id_course, id_author, lesson_order, lesson_name, content, ]
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
            `DELETE * FROM "ABB".lessons 
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
        id_author,
        lesson_order,
        lesson_name,
        content,
    } = req.body

    try {
        const result = await pool.query(
            `UPDATE "ABB".lessons
                SET id_course = $1, 
                    id_author = $2, 
                    lesson_order = $3, 
                    lesson_name = $4,
                    content = $5
                WHERE id = $6
                RETURNING *`,
            [id_course, id_author, lesson_order, lesson_name, content, id]
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