import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home'
import Profile from './pages/Profile'
import Course from './components/guest/Course';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/js" element={<Course />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
