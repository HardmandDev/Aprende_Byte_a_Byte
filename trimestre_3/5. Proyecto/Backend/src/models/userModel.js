const pool = require('../db')

const getUserById = async (id) => {
    const res = await pool.query(`
        SELECT * FROM users WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
};

const createUser = async (userData) => {
    const { first_name, last_name, email, password } = userData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insertar en la tabla 'users'
        const res = await client.query(
            `INSERT INTO users(first_name, last_name, email) VALUES($1, $2, $3) RETURNING id`,
            [first_name, last_name, email]
        );

        const userId = res.rows[0].id;

        // Insertar en la tabla 'user_credentials'
        await client.query(
            `INSERT INTO user_credentials(user_id, password) VALUES($1, $2)`,
            [userId, password] // Aquí pasamos el password ya hasheado
        );

        await client.query('COMMIT');
        return { id: userId, first_name, last_name, email };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const findUserByEmail = async (email) => {
    const res = await pool.query(
        `SELECT users.id, users.first_name, users.last_name, users.email, users.role_id, user_credentials.password
         FROM public.users
         JOIN user_credentials ON users.id = user_credentials.user_id
         WHERE users.email = $1`,
        [email]
    );
    return res.rows[0];
};

const updateUser = async (userId, userData) => {
    const { role_id, email, password } = userData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Update the role in the 'users' table
        await client.query(
            `UPDATE users SET role_id = $1, email = $2 WHERE id = $3`,
            [role_id, email, userId]
        );

        // Update the password in the 'user_credentials' table
        if (password) { // Only update if a new password is provided
            await client.query(
                `UPDATE user_credentials SET password = $1 WHERE user_id = $2`,
                [password, userId] // Pass the new hashed password
            );
        }

        await client.query('COMMIT');
        return { id: userId, role_id, email };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getUserById,
    createUser,
    findUserByEmail,
    updateUser,
};