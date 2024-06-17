const pool = require('../db')
const { check, validationResult } = require('express-validator');

const signUp = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // Validar los datos del formulario (nombre, apellido, email)

    // const errors = () => {
    //     return [
    //         check('firstName')
    //             .exists()
    //             .notEmpty()
    //             .not()
    //             .withMessage('El nombre es obligatorio'),
    //         check('lastName')
    //             .exists()
    //             .withMessage('El apellido es obligatorio'),
    //         check('email')
    //             .isEmail()
    //             .withMessage('Ingrese un email válido')
    //             .normalizeEmail(),
    //         check('password')
    //             .isLength({ min: 8 })
    //             .withMessage('La contraseña debe tener al menos 8 caracteres')
    //             .exists()
    //             .withMessage('La contraseña es obligatoria')
    //             .run()
    //     ]
    // };


    if (errors.length) {
        const validationErrors = validationResult(req);
        res.status(400).json({ errors: validationErrors });
        return;
    }

    try {

        // Insertar usuario en la tabla users
        const userResult = await pool.query(`
        INSERT INTO public.users (first_name, last_name, email)
        VALUES ($1, $2, $3)
        RETURNING id
      `, [firstName, lastName, email]);

        const userId = userResult.rows[0].id;

        // Hashear la contraseña antes de guardarla
        // const hashedPassword = await hashPassword(password);  // Reemplazar 'hashPassword' con tu función para hashear contraseñas

        // Insertar credenciales del usuario en la tabla user_credentials
        await pool.query(`
        INSERT INTO public.user_credentials (user_id, password)
        VALUES ($1, $2)
      `, [userId, password]); //password debe ser sustituida por la función hashedPassword

        res.json({ success: true });
    } catch (error) {
        next(error)
    }
}

module.exports = { signUp }