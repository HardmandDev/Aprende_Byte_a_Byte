const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'hola' })
})

app.listen(port, () => {
    console.log(`Escuchando servidor desde el puerto: ${port}`)
})