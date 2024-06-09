import React from 'react';
import './Course.css'; // Importa el archivo CSS correspondiente
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"


const Course = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/Cursos">Cursos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>JavaScript</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article>
        <div className="container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" lazy="loading" alt="Images" className="centered-image" />
        </div>

        <div>
        <Button className="button">Empezar Curso</Button>
        </div>
        
        <div className='container-2'> 
          <strong className="text-style">Aprende</strong>
          <strong className="text-style-2"><br/>JavaScript</strong>
          <p className='parrafo' >Curso intensivo de 3 semanas para aprender a codificar y <br/> convertirse en un experto en JavaScript, una base fundamental <br/> para el desarrollo web. No se necesita experiencia.</p>
          <h1 className="text1">📚 Varias lecciones</h1> 
          <h1 className="text2">🧑‍💻 Nivel de habilidad principiante</h1>
          <h1 className="text3">✅ Sin requisitos previos</h1>
        </div>
      </article>
    </>
    
  );
};

export default Course;