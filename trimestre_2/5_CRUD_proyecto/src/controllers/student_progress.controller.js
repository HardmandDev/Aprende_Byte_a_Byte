// No creo que sea util usar todos estos metodos para esta tabla
const pool = require('../db')

const getAllStudentProgress = async (req, res) => {
    try {
        const allStudentProgress = await pool.query(
            `SELECT * FROM student_progress
                RETURNING *`);
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
            `SELECT * FROM student_progress 
                WHERE id = $1
                RETURNING *`,
            [id]
        );
        if (studentProgress.rows.length === 0) {
            return res.status(404).json({
                message: 'Student progress no encontrado'
            });
        }
        res.json(studentProgress.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const createStudentProgress = async (req, res) => {
    const { 
        id_user, 
        id_course, 
        id_lesson 
    } = req.body;

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

//Creo que debería ejecutarse solo cuando se elimine un usuario, es decir, una reacción en cadena que debe eliminar la información de un usuario
const deleteStudentProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE * FROM student_progress 
                WHERE id = $1`,
            [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Student progress no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const updateStudentProgress = async (req, res) => {
    const { id } = req.params;
    const { 
        id_user, 
        id_course, 
        id_lesson 
    } = req.body

    try {
        const result = await pool.query(
            `UPDATE student_progress 
                SET id_user = $1, 
                    id_course = $2, 
                    id_lesson = $3
                WHERE id = $4
                RETURNING *`,
            [id_user, id_course, id_lesson, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Student progress no encontrado'
            });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllStudentProgress,
    getStudentProgress,
    createStudentProgress,
    deleteStudentProgress,
    updateStudentProgress
}