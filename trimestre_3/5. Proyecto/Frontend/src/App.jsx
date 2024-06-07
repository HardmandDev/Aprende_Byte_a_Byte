import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Courses from './components/guest/Courses';


import Home from './pages/Home'
import Profile from './pages/Profile'







function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<Courses />} />
        
      </Routes>
      <Footer />
    </>
  )
}



export default App









