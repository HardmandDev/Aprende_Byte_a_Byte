const pool = require('../db');

const getAllCourses = async (req, res) => {
    try {
        const allCourses = await pool.query('SELECT * FROM courses');
        res.json(allCourses.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await pool.query(
            'SELECT * FROM course WHERE id = $1',
            [id]
        );
        res.json(course.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const createCourse = async (req, res) => {
    const { name, description, image_url, level } = req.body

    try {
        const result = await pool.query(
            `INSERT INTO courses
                (name, description, image_url, level) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *`,
            [name, description, image_url, level]
        )
        res.json(result.rows[0])
        console.log(result.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

const deleteCourse = (req, res) => {
    res.send('Eliminando un curso')
}

const updateCourse = (req, res) => {
    res.send('Actualizando un curso')
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
}