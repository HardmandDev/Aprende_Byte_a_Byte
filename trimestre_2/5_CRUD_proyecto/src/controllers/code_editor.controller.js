const pool = require('../db');

const getAllCodeEditor = async (req, res) => {
    try {
        const allCodeEditor = await pool.query('SELECT * FROM code_editor');
        res.json(allCodeEditor.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getCodeEditor = (req, res) => {
    res.send('Retornando un solo Editor de Codigo');
}

const createCodeEditor = async (req, res) => {
    const { id_user, id_course, id_lesson, code } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO code_editor 
                (id_user, id_course, id_lesson, code) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *`,
            [id_user, id_course, id_lesson, code]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

const deleteCodeEditor = (req, res) => {
    res.send('Eliminando un Editor de Codigo');
}

const updateCodeEditor = (req, res) => {
    res.send('Actualizando un Editor de Codigo');
}

module.exports = {
    getAllCodeEditor,
    getCodeEditor,
    createCodeEditor,
    deleteCodeEditor,
    updateCodeEditor
}