import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Index from './components/guest/Index';
import Profile from './pages/Profile'
import SignUp from './components/guest/SignUp';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
