import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Layout from '../pages/private/Layout'

import SupportRoutes from './SupportRoutes';

import AdminDashboard from '../pages/private/admin/AdminDashboard.jsx';
import ApproveCourses from '../pages/private/admin/ApproveCourses.jsx';

function AdminRoutes() {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/auth/login" replace={true} />

    if (user.role !== 'admin') {
        return <Navigate to="/auth/login" replace={true} />;
    }

    return (
        <Routes>
            <SupportRoutes />
            <Route path='/' element={<Layout />}>
                <Route path="/dashboard" component={AdminDashboard} />
                <Route path="/approve-courses" component={ApproveCourses} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
