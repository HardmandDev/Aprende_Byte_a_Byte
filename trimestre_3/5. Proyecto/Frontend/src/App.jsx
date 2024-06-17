import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Index from './components/guest/Index';
import Profile from './pages/Profile';
import Login from './components/guest/Login';

import Courses from './components/guest/Courses';
import Course from './components/guest/Course';
import Admin from "./components/auth/admin-course/Admin";
import ProfileStudent from "./components/student/ProfileStudent";
import HomeSt from "./components/student/HomeSt";
import Lesson from "./pages/lesson"
import SupportTable from './components/auth/support/SupporTable';
import Register from './pages/Register';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/js" element={<Course />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile-student" element={<ProfileStudent />} />
        <Route path="/home-student" element={<HomeSt />} />
        <Route path="/student/javascript/lesson" element={<Lesson />} />
        <Route path="support-table" element={<SupportTable />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App