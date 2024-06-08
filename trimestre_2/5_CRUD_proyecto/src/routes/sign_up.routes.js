const { Router } = require('express');
const {
    signUp
} = require('../controllers/sign_up.controller');

const router = Router();

router.post('/sign-up', signUp); // http://localhost:3001/api/v1/sign-up

module.exports = router;