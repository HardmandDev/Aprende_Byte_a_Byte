const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/users.routes');
// Middlewares

// Port configuration
const port = process.env.PORT || 3000;

// Express app initialization
const app = express();

// Helmet configuration
app.use(helmet());

// CORS configuration
app.use(cors(
    {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

// Morgan configuration
app.use(morgan('dev'))

// Body parser configuration
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes configuration
app.use('/api/v1', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    return res.json({ message: err.message })
})

// Server initialization
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})