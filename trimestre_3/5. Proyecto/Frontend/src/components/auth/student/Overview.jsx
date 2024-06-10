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
                  <div className="logo">
                      <img src="IMG/logo.png" alt="Logo"/>
                  </div>
                  <nav className="nav">
                      <ul>
                          <li><a href="#">Inicio</a></li>
                          <li><a href="#">Aprende Python</a></li>
                          <li className="active"><a href="#">Aprende JavaScript</a></li>
                          <li><a href="#">Aprende Java</a></li>
                      </ul>
                  </nav>
                  <div className="logros">
                      <ul>
                          <li><a href="#">Certificaciones</a></li>
                      </ul>
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
                      <button>Continuar Curso</button>
                  </section>
              </main>
          </div>
      </body>
    </html>
  );
};

export default Overview;