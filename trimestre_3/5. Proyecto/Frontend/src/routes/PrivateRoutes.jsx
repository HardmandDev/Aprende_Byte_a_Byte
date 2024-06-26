/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from 'react-router-dom';
import authService from '../services/authService';

// Importar todas las páginas privadas necesarias
import Layout from '../pages/private/Layout';
import LayoutSupport from '../pages/private/zOld/support/LayoutSupport';
import Profile from '../pages/private/Profile';
import StudentDashboard from '../pages/private/student/StudentDashboard';
import Certification from '../pages/private/student/Certification';
import Lesson from '../pages/private/zOld/student/lesson'; // Ajusta la ruta de Lesson según sea necesario

import SupportDashboard from '../pages/private/support/SupportDashboard'
import EditUser from '../pages/private/zOld/support/EditUser'

import LayoutAdmin from '../pages/private/zOld/admin/LayoutAdmin'
import Admin from '../pages/private/zOld/admin/Admin'
import AdminDashboard from '../pages/private/zOld/admin/AdminDashboard'
import TeacherDashboard from '../pages/private/zOld/teacher/TeacherDashboard'
import CreateCourse from '../pages/private/zOld/teacher/CreateCourse'
import CoursesList from '../pages/private/teacher/CoursesList'

import UserTable from '../pages/private/zOld/support/UserTable';
import TableLessons from '../pages/private/zOld/admin/TableLessons';
import EditCourse from '../pages/private/zOld/teacher/EditCourse';
import CreateLesson from '../pages/private/zOld/teacher/CreateLesson';



const PrivateRoute = ({ element , roles }) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUser();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (roles && !roles.includes(userRole.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="student" element={<Layout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="certifications" element={<Certification />} />
        {/* Ajusta la ruta de Lesson según tus necesidades */}
        <Route path="course/js/lesson/1" element={<Lesson />} />
        <Route path="*" element={'Error 404'} />
      </Route>
      <Route path="support" element={<LayoutSupport />}>
        <Route index element={<PrivateRoute roles={['support', 'admin']} element={<SupportDashboard />} />} />
        <Route path='manage-users' element={<PrivateRoute roles={['support', 'admin']} element={<UserTable />} />} />
        <Route path='manage-users/edit-user/:id' element={<PrivateRoute roles={['support', 'admin']} element={<EditUser />} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={'Error 404'} />
      </Route>
      <Route path="admin" element={<LayoutAdmin />}>
        <Route index element={<PrivateRoute roles={['admin']} element={<AdminDashboard />} />} />
        <Route path='courses' element={<PrivateRoute roles={['admin']} element={<Admin />} />} />
        <Route path='lessons' element={<PrivateRoute roles={['admin']} element={<TableLessons />} />} />
        <Route path='manage-users' element={<PrivateRoute roles={['admin', 'support']} element={<UserTable />} />} />
        <Route path='manage-users/edit-user/:id' element={<PrivateRoute roles={['support', 'admin']} element={<EditUser />} />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="*" element={'Error 404'} /> */}
      </Route>
      <Route path="teacher" element={<Layout />}>
        <Route index element={<PrivateRoute roles={['teacher']} element={<TeacherDashboard/>} />} />
        <Route path='courses' element={<PrivateRoute roles={['admin', 'teacher']} element={<CoursesList />} />} />
        <Route path='create-course' element={<PrivateRoute roles={['teacher', 'admin', 'support']} element={<CreateCourse />} />}/>
        <Route path='courses/:course_id/create-lesson' element={<PrivateRoute roles={['teacher', 'support', 'admin']} element={<CreateLesson />} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={'Error 404'} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;