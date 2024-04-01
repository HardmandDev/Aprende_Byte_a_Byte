const { Router } = require("express");

const router = Router();

router.get('/users', (req, res) => {
    res.send('Retornando una lista de usuarios');
});

router.get('/users/:id', (req, res) => {
    res.send('Retornando un solo usuario');
});

router.post('/users', (req, res) => {
    res.send('Creando un nuevo usuario');
});

router.delete('/users', (req, res) => {
    res.send('Eliminando un usuario');
});

router.put('/users', (req, res) => {
    res.send('Actualizando un usuario');
});

module.exports = router;