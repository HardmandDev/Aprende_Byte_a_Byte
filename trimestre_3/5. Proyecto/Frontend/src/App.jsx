import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home'
import Profile from './pages/Profile'
import Index from './components/guest/Index';
import SignUp from './components/guest/SignUp';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/index" element={<Index />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
