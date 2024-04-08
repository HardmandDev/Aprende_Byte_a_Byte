const pool = require('../db')

const setPassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const result = await client.query({
            text: `INSERT INTO "ABB".user_credentials (id_user, password)
            VALUES ($1 ,$2);`,
            values: [id, password]
        });

        await client.query('COMMIT');

        res.json(result.rows);
    } catch (err) {
        await client.query('ROLLBACK');
        next(err);
    } finally {
        client.release();
    }
}


const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const result = await client.query({
            text: `UPDATE "ABB".user_credentials  
            SET password = $1 
            WHERE id_user = $2`,
            values: [password, id]
        });

        await client.query('COMMIT');

        res.json(result.rows);
    } catch (err) {
        await client.query('ROLLBACK');
        next(err);
    } finally {
        client.release();
    }
}


module.exports = {
    setPassword,
    updatePassword
};