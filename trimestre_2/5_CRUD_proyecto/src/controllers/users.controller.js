const pool = require('../db');

const getAllUsers = async (req, res) => {
    // Consulta a la base de datos
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    // Destructuración de req.body
    const { first_name, last_name, email, password, role } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO users 
                (first_name, last_name, email, hashed_password, role) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
            [first_name, last_name, email, password, role]
        )
        res.json(result.rows[0])
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE * FROM users WHERE id = $1`, [id]);

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

const updateUser = (req, res) => {
    res.send('Actualizando un usuario');
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}