import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Index from './components/guest/Index';
import Profile from './pages/Profile'
import Login from './components/guest/Login';
import SignUp from './components/guest/SignUp';
import Courses from './components/guest/Courses';
import Course from './components/guest/Course';
import SupportTable from './components/auth/support/SupporTable';


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
        <Route path="/support-table" element={<SupportTable />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App