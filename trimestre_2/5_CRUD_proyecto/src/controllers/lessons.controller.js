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

const getLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const lessons = await pool.query(
            'SELECT * FROM lessons WHERE id = $1',
            [id]
        );
        res.json(lessons.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
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

const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE * FROM lessons WHERE id = $1`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Lección no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
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