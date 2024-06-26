import { Routes, Route, Navigate } from 'react-router-dom';
import authService from '../services/authService.js';

import PublicRoutes from '../routes/PublicRoutes';

import Layout from '../pages/private/Layout'

import Profile from '../pages/private/Profile';

import StudentDashboard from '../pages/private/student/StudentDashboard';
import Certification from '../pages/private/student/Certification';
// import CourseDetails from '../pages/private/student/Lesson.jsx';
import Lesson from '../pages/private/zOld/student/lesson.jsx'

function StudentRoutes() {

    // const isAuthenticated = authService.isAuthenticated();

    // if (!isAuthenticated.isAuthenticated) {
    //     return <Navigate to='/' />;
    // }

    return (
        <Routes>
            {/* <Route element={<PublicRoutes />} /> */}
            <Route path='student' element={<Layout />}>
                <Route index element={<StudentDashboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path="certifications" element={<Certification />} />
                <Route path='course/:courseId/lesson/:lessonId' element={<Lesson />} />
                <Route path="*" element={'Error 404'} />
            </Route>
        </Routes>
    );
}

export default StudentRoutes;
