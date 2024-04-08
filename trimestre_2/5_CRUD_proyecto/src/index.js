const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

// Routes
const userRoutes = require('./routes/users.routes');
const codeRoutes = require('./routes/code_editor.routes');
const courseRoutes = require('./routes/courses.routes');
const lessonRoutes = require('./routes/lessons.routes');
const student_progressRoutes = require('./routes/student_progress.routes');
const test_resultsRoutes = require('./routes/test_results.routes');
const resetRoutes = require('./routes/password.routes');

// Port configuration

const port = process.env.PORT || 3000;
// Express app initialization
const app = express();

app.use(helmet());

// CORS configuration
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

app.use(morgan('dev'))
app.use(express.json())

app.use(
    '/api/v1',
    userRoutes,
    codeRoutes,
    courseRoutes,
    lessonRoutes,
    student_progressRoutes,
    test_resultsRoutes,
    resetRoutes
)

// Error handling middleware
app.use((err, req, res, next) => {
    return res.json({ message: err.message })
})

app.listen(port, () => {
    console.log(`Escuchando servidor desde el puerto: ${port}`)
})