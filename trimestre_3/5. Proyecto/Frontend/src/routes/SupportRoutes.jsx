import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Layout from '../pages/private/Layout'

import TeacherRoutes from './TeacherRoutes';

import SupportDashboard from '../pages/private/support/SupportDashboard';
import ManageUsers from '../pages/private/support/ManageUsers';

function SupportRoutes() {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/auth/login" replace={true} />

    if (user.role !== 'support' && user.role !== 'admin') {
        return <Navigate to="/auth/login" replace={true} />;
    }

    return (
        <Routes>
            <TeacherRoutes />
            <Route path="/dashboard" component={Layout}>
                <Route index component={SupportDashboard} />
                <Route path="/manage-users" component={ManageUsers} />
            </Route>
        </Routes>
    );
}

export default SupportRoutes;
