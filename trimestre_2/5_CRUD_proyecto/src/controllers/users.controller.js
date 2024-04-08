const pool = require('../db');

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await pool.query(
            `SELECT * FROM users`
        );
        res.json(allUsers.rows);
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await pool.query(
            `SELECT * FROM users 
                WHERE id = $1`,
            [id]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.json(user.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    // Destructuración de req.body
    const {
        id_document_type,
        document,
        first_name,
        last_name,
        email,
        id_role
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO users 
                (id_document_type, document, first_name, last_name, email, id_role) 
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *`,
            [id_document_type, document, first_name, last_name, email, id_role]
        )
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE * FROM users 
                WHERE id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const {
        id_document_type,
        document,
        first_name,
        last_name,
        email,
        id_role
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users 
                SET 
                    id_document_type = $1, 
                    document = $2, 
                    first_name = $3, 
                    last_name = $4, 
                    email = $5, 
                    role = $6
                WHERE id = $7
                RETURNING *`,
            [id_document_type, document, first_name, last_name, email, id_role, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}