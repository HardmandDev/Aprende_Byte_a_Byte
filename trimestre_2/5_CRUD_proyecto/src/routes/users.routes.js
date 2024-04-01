const { Router } = require("express");
const pool = require('../db')

const router = Router();

router.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users;')
    res.json(result.rows[0].name)
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