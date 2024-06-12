const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.getUserById(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
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
        const { role_id, email, password, document_type_id, document, first_name, last_name } = req.body;

        // Obtain the current user
        const user = await userModel.getUserById(id);

        // Update the user's fields with the values from the request body
        if (role_id) {
            user.role_id = role_id;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            // Hash the password before updating
            user.password = await bcrypt.hash(password, 10);
        }
        if (document_type_id) {
            user.document_type_id = document_type_id;
        }
        if (document) {
            user.document = document;
        }
        if (first_name) {
            user.first_name = first_name;
        }
        if (last_name) {
            user.last_name = last_name;
        }

        // Update the user in the database
        const updatedUser = await userModel.updateUser(id, user);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
}


module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
