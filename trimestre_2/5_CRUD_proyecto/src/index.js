const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

// Routes
const userRoutes = require('./routes/users.routes');
const codeRoutes = require('./routes/code_editor.routes');
const courseRoutes = require('./routes/courses.routes');
const lessonRoutes = require('./routes/lessons.routes');
const student_progressRoutes = require('./routes/student_progress.routes');
const test_resultsRoutes = require('./routes/test_results.routes');

// Express app initialization
const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json())

app.use(
    userRoutes,
    codeRoutes,
    courseRoutes,
    lessonRoutes,
    student_progressRoutes,
    test_resultsRoutes
)

// Error handling middleware
app.use((err, req, res, next) => {
    return res.json({ message: err.message })
})

app.get('/', (req, res, next) => {
    res.json({ message: 'hola' })
})

app.listen(port, () => {
    console.log(`Escuchando servidor desde el puerto: ${port}`)
})