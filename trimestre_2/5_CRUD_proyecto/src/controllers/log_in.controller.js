const pool = require('../db');

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Consulta para obtener el usuario y su contraseña
        const userResult = await pool.query(`
            SELECT u.id, u.first_name, u.last_name, u.email, u.role_id, uc.password
            FROM public.users u
            JOIN public.user_credentials uc ON u.id = uc.user_id
            WHERE u.email = $1 AND uc.password = $2
        `, [email, password]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const user = userResult.rows[0];

        // Enviar la respuesta si la autenticación es exitosa
        res.json({
            success: true,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role_id: user.role_id
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { logIn };
