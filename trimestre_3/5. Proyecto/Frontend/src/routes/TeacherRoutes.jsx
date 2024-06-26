import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Layout from '../pages/private/Layout'

import StudentRoutes from './StudentRoutes';

import TeacherDashboard from '../pages/private/teacher/TeacherDashboard.jsx';
import CreateCourse from '../pages/private/teacher/CreateCourse.jsx';

function TeacherRoutes() {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/auth/login" replace={true} />
    
    if (user.role !== 'teacher' && user.role !== 'support' && user.role !== 'admin') {
        return <Navigate to="/auth/login" replace={true} />;
    }

    return (
        <Routes>
            <StudentRoutes />
            <Route path="/" element={<Layout />}>
                <Route path="/dashboard" component={TeacherDashboard} />
                <Route path="/create-course" component={CreateCourse} />
            </Route>
        </Routes>
    );
}

export default TeacherRoutes;
