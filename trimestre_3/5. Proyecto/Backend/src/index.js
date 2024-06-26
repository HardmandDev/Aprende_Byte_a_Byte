const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const middleware = require('./middlewares/middlewares');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/users.routes');
const statusRoutes = require('./routes/status.routes');
const coursesRoutes = require('./routes/courses.routes');
const lessonsRoutes = require('./routes/lessons.routes');
const teacherCodeRoutes = require('./routes/teacher_code.routes');
const studentCodeRoutes = require('./routes/student_code.routes');
const studentProgressRoutes = require('./routes/student_progress.routes');
const testResultRoutes = require('./routes/test_results.routes');
const certificationRoutes = require('./routes/certifications.routes');

// Port configuration
const port = process.env.PORT || 3000;

// Express app initialization
const app = express();

// Helmet configuration
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Morgan configuration
app.use(morgan('dev'));

// Body parser configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files with correct headers
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Cross-Origin-Embedder-Policy', 'require-corp');
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));

// Routes configuration
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api/v1/teacher_code', teacherCodeRoutes);
app.use('/api/v1/student_code', studentCodeRoutes);
app.use('/api/v1/student_progress', studentProgressRoutes);
app.use('/api/v1/test_result', testResultRoutes);
app.use('/api/v1/certification', certificationRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/lessons', lessonsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    return res.json({ message: err.message });
});

// Server initialization
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
