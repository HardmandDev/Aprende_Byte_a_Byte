const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const userRoutes = require('./routes/users.routes')

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('dev'))

app.use(userRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'hola' })
})

app.listen(port, () => {
    console.log(`Escuchando servidor desde el puerto: ${port}`)
})