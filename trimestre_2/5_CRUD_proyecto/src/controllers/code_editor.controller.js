const pool = require('../db');

const getAllCodeEditor = async (req, res, next) => {
    try {
        const allCodeEditor = await pool.query(
            `SELECT * FROM "ABB".code_editor`
        );
        res.json(allCodeEditor.rows);
    } catch (error) {
        next(error)
    }
}

const getCodeEditor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const codeEditor = await pool.query(
            `SELECT * FROM codeEditor 
                WHERE id = $1`,
            [id]
        );

        if (codeEditor.rows.length === 0) {
            return res.status(404).json({
                message: 'Editor de Codigo no encontrado'
            });
        }

        res.json(codeEditor.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createCodeEditor = async (req, res, next) => {
    const {
        id_user,
        id_lesson,
        code
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO "ABB".code_editor 
                (id_user, id_lesson, code) 
                VALUES ($1, $2, $3) 
                RETURNING *`,
            [id_user, id_lesson, code]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteCodeEditor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE * FROM "ABB".code_editor 
                WHERE id = $1`,
            [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Editor de Codigo no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateCodeEditor = async (req, res, next) => {
    const { id } = req.params;
    const {
        id_user,
        id_lesson,
        code
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE "ABB".code_editor 
                SET id_user = $1, 
                    id_lesson = $2, 
                    code = $3
                WHERE id = $4
                RETURNING *`,
            [id_user, id_lesson, code, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Editor de Codigo no encontrado'
            })
        }
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAllCodeEditor,
    getCodeEditor,
    createCodeEditor,
    deleteCodeEditor,
    updateCodeEditor
}