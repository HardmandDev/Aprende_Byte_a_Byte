const pool = require('../db')

// Used by the updateUser and getUserById functions of users.controller.js
const getUserById = async (id) => {
    const res = await pool.query(`
        SELECT * FROM users WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
};

// Used by the getUsers function of users.controller.js
const getUsers = async () => {
    const res = await pool.query(`
        SELECT * FROM users
        `,
    );
    return res.rows;
};

// Used by the createUser function of users.controller.js
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

// Used by the loginUser function of auth.controller.js
const findUserByEmail = async (email) => {
    try {
        const res = await pool.query(
        `SELECT users.id, users.first_name, users.last_name, users.email, users.role_id, user_credentials.password, roles.role
         FROM public.users
         JOIN user_credentials ON users.id = user_credentials.user_id
         JOIN roles ON users.role_id = roles.id
         WHERE users.email = $1`,
            [email]
        );
        console.log('Usuario encontrado:', res.rows[0]); // Agrega este log
        return res.rows[0];
    } catch (error) {
        console.error('Error al buscar usuario:', error); // Agrega este log
        throw error;
    }

};

const findUserByEmailNUEVA = async (email) => {
    try {
        const res = await pool.query(
            `SELECT users.id, users.first_name, users.last_name, users.email, roles.name AS role_name, user_credentials.password
             FROM public.users
             JOIN user_credentials ON users.id = user_credentials.user_id
             JOIN roles ON users.role_id = roles.id
             WHERE users.email = $1`,
            [email]
        );

        console.log('Usuario encontrado:', res.rows[0]); // Agrega este log

        return res.rows[0];
    } catch (error) {
        console.error('Error al buscar usuario:', error); // Agrega este log
        throw error;
    }
};

// Used by the updateUser function of users.controller.js
const updateUser = async (userId, userData) => {
    const { email, password, document_type_id, document, first_name, last_name } = userData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Update the role in the 'users' table
        await client.query(
            `UPDATE users SET email = $1, document_type_id = $2, document = $3, first_name = $4, last_name = $5 WHERE id = $6`,
            [email, document_type_id, document, first_name, last_name, userId]
        );

        // Update the password in the 'user_credentials' table
        if (password) { // Only update if a new password is provided
            await client.query(
                `UPDATE user_credentials SET password = $1 WHERE user_id = $2`,
                [password, userId] // Pass the new hashed password
            );
        }

        await client.query('COMMIT');
        return { id: userId, email, document_type_id, document, first_name, last_name };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const updateUserRole = async (userId, userData) => {
    const { role_id } = userData;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await client.query(
            `UPDATE users SET role_id = $1 WHERE id = $2`,
            [role_id, userId]
        );
        await client.query('COMMIT');
        return { id: userId, role_id };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// Used by the deleteUser function of users.controller.js
const deleteUser = async (userId) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Delete from user_credentials
        await client.query(
            `DELETE FROM user_credentials WHERE user_id = $1`,
            [userId]
        );

        // Delete from users
        await client.query(
            `DELETE FROM users WHERE id = $1`,
            [userId]
        );

        // Delete from other tables where the user might be referenced (e.g., courses)
        // Add more DELETE queries for other tables as needed
        // Example:
        // await client.query(
        //     `DELETE FROM courses WHERE user_id = $1`,
        //     [userId]
        // );

        await client.query('COMMIT');
        return true; // Indicate successful deletion
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getUserById,
    getUsers,
    createUser,
    findUserByEmail,
    updateUser,
    updateUserRole,
    deleteUser,
};