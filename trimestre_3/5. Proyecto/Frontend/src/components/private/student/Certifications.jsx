import './Certifications.css';
import React from 'react';
import  Sidebar  from '@/components/auth/student/Sidebar';

 
export default function Certifications () {
  return (
    <div className='certifications-page'>
      <Sidebar />
        <div className="certifications-container">
          <div className="certifications">
            <h1>Descarga tus</h1>
            <h2 className="certf-text">Certificados Adquiridos</h2>
          <div className="message">
            <p>⚠️ Aún no has finalizado ninguno de los cursos. <br/> Vuelve a intentarlo cuando finalices uno.</p>
          </div>
          </div>
        </div>
    </div>  
  );
}
