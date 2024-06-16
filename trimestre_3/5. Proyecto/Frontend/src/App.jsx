import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Index from './components/guest/Index';
import Profile from './pages/Profile';
import Login from './components/guest/Login';
import SignUp from './components/guest/SignUp';
import Courses from './components/guest/Courses';
import Course from './components/guest/Course';
import Admin from "./components/auth/admin-course/Admin";
import ProfileStudent from "./pages/ProfileStudent";
import HomeSt from "./pages/HomeSt";
import Overview from "./components/auth/student/Overview";
import Certifications from './components/auth/student/Certifications';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/js" element={<Course />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile-student" element={<ProfileStudent />} />
        <Route path="/home-student" element={<HomeSt />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/certifications" element={<Certifications />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App