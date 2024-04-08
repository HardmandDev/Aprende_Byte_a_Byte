const pool = require('../db')

const setPassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO "ABB".user_credentials (id_user, password)
            VALUES ($1 ,$2);`,
            [id, password]
        );

        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const result = await pool.query(
            `UPDATE "ABB".user_credentials  
            SET password = $1 
            WHERE id_user = $2`,
            [password, id]
        );

        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    setPassword,
    updatePassword
};