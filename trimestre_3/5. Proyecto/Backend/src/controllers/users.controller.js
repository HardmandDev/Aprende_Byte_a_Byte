const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario con contraseña hasheada
        const newUser = await userModel.createUser({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role_id, email, password } = req.body;

        // Hash de la nueva contraseña si se proporciona
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar usuario
        const updatedUser = await userModel.updateUser(id, {
            role_id,
            email,
            password: hashedPassword // Aquí pasamos la nueva contraseña hasheada
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
};

module.exports = {
    createUser,
    updateUser,
};
