// No creo que sea util usar todos estos metodos para esta tabla
const pool = require('../db')

const getAllStudentProgress = async (req, res) => {
    try {
        const allStudentProgress = await pool.query('SELECT * FROM student_progress');
        res.json(allStudentProgress.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getStudentProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const studentProgress = await pool.query(
            'SELECT * FROM student_progress WHERE id = $1',
            [id]
        );
        res.json(studentProgress.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const createStudentProgress = async (req, res) => {
    const { id_user, id_course, id_lesson } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO student_progress 
                (id_user, id_course, id_lesson)
                VALUES ($1, $2, $3)
                RETURNING *`,
            [id_user, id_course, id_lesson]
        )
        res.json(result.rows[0])
        console.log(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const deleteStudentProgress = (req, res) => {
    res.send('Eliminando un progreso de estudiante');
}

const updateStudentProgress = (req, res) => {
    res.send('Actualizando un progreso de estudiante');
}

module.exports = {
    getAllStudentProgress,
    getStudentProgress,
    createStudentProgress,
    deleteStudentProgress,
    updateStudentProgress
}