import { Routes, Route } from 'react-router-dom';

import Layout from '../pages/public/Layout.jsx';

import Index from '../pages/public/Index.jsx';
import Courses from '../pages/public/Courses.jsx';
import Course from '../pages/public/Course.jsx';
import Login from '../pages/public/Login.jsx';
import SignUp from '../pages/public/SignUp.jsx';
// import ResetPassword from '../pages/public/ResetPassword.jsx'; // Falta crearlo

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/js" element={<Course />} /> {/* Ingresar :id, cuando se defina la lógica de la ruta */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {/* <Route path="/auth/reset-password" element={<ResetPassword />} /> */}
      </Route>
    </Routes>
  );
};

export default PublicRoutes;