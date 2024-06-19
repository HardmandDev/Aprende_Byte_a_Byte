import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

import Profile from '../pages/private/Profile';
import EditUser from '../pages/private/support/EditUser.jsx'

import Student from '../pages/private/student/HomeSt.jsx';
import Support from '../pages/private/support/Index.jsx';
import Admin from '../pages/private/admin/Admin.jsx';
import Teacher from '../pages/private/teacher/Index.jsx';

import CreateCourseAndLessons from '../pages/private/teacher/CreateCourseAndLessons.jsx'

import UnauthorizedPage from '../pages/UnauthorizedPage.jsx'; //No existe por ahora

const PrivateRoute = ({ children, roles }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (roles && !roles.includes(user.role_id)) {
    // Redireccionar a una página de acceso no autorizado o a una página predeterminada
    return <Route path="/unauthorized" element={<UnauthorizedPage />} />;
  }

  return children;
};

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <PrivateRoute roles={
            ['8c890948-5402-40e6-a38d-6f2df9e3b4db',
              '6126917f-f7e3-4ee8-a5a1-16e3b128f26b',
              '7bf4770d-ab11-4aba-9e0a-991b3f162488',
              'f3d9324c-ecbd-4d1b-bc92-dbe75ff149db'
            ]}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/student"
        element={
          <PrivateRoute roles={['8c890948-5402-40e6-a38d-6f2df9e3b4db']}>
            <Student />
          </PrivateRoute>
        }
      />
      <Route
        path="/support"
        element={
          <PrivateRoute roles={['6126917f-f7e3-4ee8-a5a1-16e3b128f26b']}>
            <Support />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-user/:id"
        element={
          <PrivateRoute roles={['6126917f-f7e3-4ee8-a5a1-16e3b128f26b']}>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={['7bf4770d-ab11-4aba-9e0a-991b3f162488']}>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <PrivateRoute roles={['f3d9324c-ecbd-4d1b-bc92-dbe75ff149db']}>
            <Teacher />
          </PrivateRoute>
        }
      />
      <Route 
        path='/create-course'
        element={
          <PrivateRoute>
            <CreateCourseAndLessons/>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};

export default PrivateRoutes;