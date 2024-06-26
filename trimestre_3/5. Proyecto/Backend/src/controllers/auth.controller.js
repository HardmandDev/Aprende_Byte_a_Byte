const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
require('dotenv').config();
const userModel = require('../models/userModel');


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(
            {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role_id: user.role_id,
                role: user.role,
            });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
};

module.exports = {
    loginUser,
};
