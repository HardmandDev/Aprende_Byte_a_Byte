import './Overview.css';
import React from 'react';

const Overview = () => {
  return (
    <html lang="es">
      <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Aprende JavaScript</title>
          <link rel="stylesheet" href="Styles/styles.css"/>
      </head>
      <body>   
          <div className="container">
              <aside className="sidebar">
                  <nav className="nav">      
                  </nav>
                  <div className="logros">

                  </div>
              </aside>
              <main className="content">
                  <section className="course-info">
                      <h1><img src="IMG/js-logo.png" alt="JavaScript Logo"/> Aprende JavaScript</h1>
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
                     <center><button>Continuar Curso</button></center> 
                  </section>
              </main>
          </div>
      </body>
      <div className="sidenav">
      <div className="logo">
      <img src="src/components/auth/student/images/APRENDE-removebg-preview.png" alt="Logo" />
      </div>
      <ul>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="inicio"></i>
            <img src="https://university.alchemy.com/assets/home_logo.8e92adf7.svg" alt="Inicio" /> 
                Inicio
          </a>
        </li>
        <li className="nav-item">
          <h6 className="nav-title">CURSOS</h6>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="python"></i>
            <div className='python-img'>
            <img src="https://university.alchemy.com/assets/solidity_logo.9592516e.svg" alt="Aprende Python" />
            </div>
            Aprende Python
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fab fa-js-square"></i>
            <img src="https://university.alchemy.com/assets/js_logo_drawer.384f31cc.svg" alt="Aprende JavaScript" />
            Aprende Javascript
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fab fa-java"></i>
            <img src="https://university.alchemy.com/assets/eth_logo_drawer.8e1d06af.svg" alt="Aprende Java" />
            Aprende Java
          </a>
        </li>
        <li className="nav-item">
          <h6 className="nav-title">LOGROS</h6>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-certificate"></i>
            <img src="https://university.alchemy.com/cert-icon.svg" alt="Certificaciones" />
              <span>Certificaciones</span>
          </a>
        </li>
      </ul>
      
    </div>     
    </html>
  );
};
    


export default Overview;