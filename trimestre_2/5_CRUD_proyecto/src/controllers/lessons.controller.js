const pool = require('../db');

const getAllLessons = async (req, res) => {
    try {
        const allLessons = await pool.query('SELECT * FROM lessons');
        res.json(allLessons.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getLesson = (req, res) => {
    res.send('Retornando una sola leccion');
}

const createLesson = async (req, res) => {
    const { id_course, title, content, lesson_order } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO lessons
                (id_course, title, content, lesson_order) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *`,
            [id_course, title, content, lesson_order]
        )
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

const deleteLesson = (req, res) => {
    res.send('Eliminando una leccion');
}

const updateLesson = (req, res) => {
    res.send('Actualizando una leccion');
}

module.exports = {
    getAllLessons,
    getLesson,
    createLesson,
    deleteLesson,
    updateLesson
}