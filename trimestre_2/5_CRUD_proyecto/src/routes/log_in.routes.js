const { Router } = require('express');
const {
    logIn
} = require('../controllers/log_in.controller');

const router = Router();

router.post('/login', logIn); // http://localhost:3001/api/v1/login

module.exports = router;