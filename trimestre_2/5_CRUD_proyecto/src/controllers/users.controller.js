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
        first_name,
        last_name,
        email,
        hashed_password,
        role
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO users 
                (first_name, last_name, email, hashed_password, role) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [first_name, last_name, email, hashed_password, role]
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
        first_name,
        last_name,
        email,
        hashed_password,
        role
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users 
                SET first_name = $1, 
                    last_name = $2, 
                    email = $3, 
                    hashed_password = $4, 
                    role = $5 
                WHERE id = $6 
                RETURNING *`,
            [first_name, last_name, email, hashed_password, role, id]
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