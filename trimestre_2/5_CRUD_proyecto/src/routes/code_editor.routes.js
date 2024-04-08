const { Router } = require('express');
const {
    getAllCodeEditor,
    getCodeEditor,
    createCodeEditor,
    deleteCodeEditor,
    updateCodeEditor,
} = require('../controllers/code_editor.controller');

const router = Router();

router.get('/code-editor', getAllCodeEditor);

router.get('/code-editor/:id', getCodeEditor);

router.post('/code-editor', createCodeEditor);

router.delete('/code-editor/:id', deleteCodeEditor);

router.put('/code-editor/:id', updateCodeEditor);

module.exports = router;