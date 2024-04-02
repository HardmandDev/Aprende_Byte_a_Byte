const { Router } = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/code_editor.controller');

const router = Router();

router.get('/code-editor', getAllUsers);

router.get('/code-editor/:id', getUser);

router.post('/code-editor', createUser);

router.delete('/code-editor/:id', deleteUser);

router.put('/code-editor/:id', updateUser);

module.exports = router;