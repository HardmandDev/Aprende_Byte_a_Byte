const { Router } = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
} = require('../controllers/users.controller')

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.delete('/users', deleteUserById);

router.put('/users', updateUserById);

module.exports = router;