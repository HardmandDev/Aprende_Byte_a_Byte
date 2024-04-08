const { Router } = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/users.controller');

// Router initialization
const router = Router();

// Route without parameters
router.get('/users', getAllUsers);

// Route with parameters
router.get('/users/:id', getUser);

// Route with body data
router.post('/users', createUser);

// Route with parameters and body data
router.delete('/users/:id', deleteUser);

// Route with parameters and body data
router.put('/users/:id', updateUser);

// Export the router
module.exports = router;