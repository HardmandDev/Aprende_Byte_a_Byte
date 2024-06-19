import React from 'react';
import Sidebar from '@/components/auth/student/Sidebar';
import { Button } from '@/components/ui/button';
import './Overview.css';

export default function Overview() {
  return (
    <>
      <div className="container-overview">
        <Sidebar />
        <main className="main-content">
          <section className="course-info">
            <h1>
              <img src="https://jxflqsyvqljdinlwdsfx.supabase.co/storage/v1/object/public/ABB/Courses/JavaScript.png" alt="JavaScript Logo" className='Javascript-logo' style={{ width: '100px', height: 'auto' }} />
              Aprende JavaScript
            </h1>
            <div className="course-details">
              <span>3 semanas</span>
              <span>Principiante</span>
              <span>Ninguno</span>
            </div>
            <p>Curso intensivo de 3 semanas para aprender a codificar y convertirse en un experto en JavaScript, una base fundamental para el desarrollo web. No se necesita experiencia.</p>
            <p>Este curso intensivo de JavaScript cubre los conceptos básicos de la programación a través de temas avanzados como solicitudes y promesas asincrónicas.</p>
            <h2>Habilidades que aprenderás</h2>
            <div className="skills">
              <span>Master Javascript</span>
              <span>Coding 101</span>
            </div>
            <center>
              <Button>Continuar Curso</Button>
            </center>
          </section>
        </main>
      </div>
    </>
  );
};

