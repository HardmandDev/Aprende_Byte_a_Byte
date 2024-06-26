import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ModeToggle from "@/components/mode-toggle"
import { Separator } from '@/components/ui/separator';
import useNavigateToRole from "../../../hooks/useNavigateToRole";
import authService from '../../../services/authService';

function Sidebar() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  });

  const navigate = useNavigate();
  const navigateToRole = useNavigateToRole();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData({
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/auth/login');
  };

  return (
    <header className="scrollArea-container">
      <div className="h-[780px] w-[300px] p-7" style={{ borderColor: 'gray' }}>
        <div className="flex justify-center items-center mb-4">
          <a href="/">
            <img src="/APRENDE-removebg-preview.png" alt="Logo" className="image-logo" />
          </a>
        </div>
        <h3>
          {userData.first_name}
        </h3>
        <h3>
          {userData.last_name}
        </h3>
        <h6 className="text-sm">
          {userData.email}
        </h6>
        <h6 className="text-sm">
          Rol: {userData.role}
        </h6>
        <Separator className="my-4" />
        <aside>
          <Button variant="outline" className="w-full" onClick={() => navigateToRole(`${userData.role}`)}>
            <img src="https://university.alchemy.com/assets/home_logo.8e92adf7.svg" alt="Inicio" className="image-home" />
            Inicio
          </Button>
          <strong className="text-course ">
            Usuarios
          </strong>
          <Button variant="outline" className="w-full"
            onClick={() => navigate(`manage-users`)}>
            Tabla de usuarios
          </Button>
          <Separator className="my-4" />
          <div className="mt-3">
          <ModeToggle />
          </div>
          <div className="">
            <Button variant="outline" className="w-full mt-5" style={{ borderColor: 'gray' }}
              onClick={() => navigate('profile')}>
              Mi perfil
            </Button>
            <Button variant="outline" className="w-full mt-1" style={{ borderColor: 'red' }} onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Sidebar;
