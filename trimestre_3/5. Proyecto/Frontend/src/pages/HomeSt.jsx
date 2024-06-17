import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '@/components/auth/student/Sidebar';
import './HomeSt.css';

export default function HomeSt() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.first_name); 
    }
  }, []);

  return (
    <article>
      <Sidebar />
      <div className="container-welcome">
        <div className="h-[800px] w-[500px] tab-content">
          <strong className="text-welcome">
            Bienvenido, 
          </strong>
          <br />
          <strong className="text-welcome-2">
            {userName}!
          </strong>
          {/* <div className="text-welcome-3">
            VOLVER A ENTRAR
          </div> */}
          <div className="container-course">
            <strong>Conceptos Básicos</strong>
            <h2>Progreso del módulo:</h2>
            <Button>Continuar Curso</Button>         
          </div>
        </div>
      </div>
    </article>
  );
}
