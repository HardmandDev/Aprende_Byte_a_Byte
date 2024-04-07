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

const getCodeEditor = async (req, res) => {
    try {
        const { id } = req.params;
        const codeEditor = await pool.query(
            'SELECT * FROM codeEditor WHERE id = $1',
            [id]
        );
        res.json(codeEditor.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
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

const deleteCodeEditor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE * FROM code_editor WHERE id = $1`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
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