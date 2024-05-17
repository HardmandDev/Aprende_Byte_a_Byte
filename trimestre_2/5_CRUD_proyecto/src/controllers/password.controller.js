const pool = require('../db')

// Creates a new password for a user.
const setPassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    let client;

    try {
        client = await pool.connect();
        // Begins a SQL transaction.
        await client.query('BEGIN');

        // Inserts a new row into the user_credentials table with the new password.
        const result = await client.query({
            text: `INSERT INTO "ABB".user_credentials (id_user, password)
            VALUES ($1 ,$2);`,
            values: [id, password]
        });

        // Commits the changes made in the SQL transaction.
        await client.query('COMMIT');

        res.json(result.rows);
    } catch (err) {
        // Rolls back the changes made in the SQL transaction.
        await client.query('ROLLBACK');
        next(err);
    } finally {
        // Closes the connection to the database.
        client.release();
    }
}

// Updates a user's password.
const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    let client;

    try {
        client = await pool.connect();
        // Begins a SQL transaction.
        await client.query('BEGIN');
        // Updates a user's password in the user_credentials table.
        const result = await client.query({
            text: `UPDATE "ABB".user_credentials  
            SET password = $1 
            WHERE id_user = $2`,
            values: [password, id]
        });
        // Commits the changes made in the SQL transaction.
        await client.query('COMMIT');

        res.json(result.rows);
    } catch (err) {
        // Rolls back the changes made in the SQL transaction.
        await client.query('ROLLBACK');
        next(err);
    } finally {
        // Closes the connection to the database.
        client.release();
    }
}


module.exports = {
    setPassword,
    updatePassword
};