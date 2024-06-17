const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/users.routes');
const statusRoutes = require('./routes/status.routes');
const coursesRoutes = require('./routes/courses.routes');
const lessonsRoutes = require('./routes/lessons.routes');
const teacherCodeRoutes = require('./routes/teacher_code.routes')
const studentCodeRoutes = require('./routes/student_code.routes');

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
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/status', statusRoutes); // courses and lessons status
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/lessons', lessonsRoutes);
app.use('/api/v1/teacher_code', teacherCodeRoutes);
app.use('/api/v1/student_code', studentCodeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    return res.json({ message: err.message })
})

// Server initialization
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})