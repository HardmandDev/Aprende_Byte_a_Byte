import React from "react";
import "./HomeSt.css";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"


export default function HomeSt() {
  return (
    <article className="tab-container">
      <header className="scrollArea-container">
        <ScrollArea className="h-[780px] w-[300px] rounded-md border p-7" style={{borderColor:'gray'}}>
          <div className="flex justify-center items-center mb-4">
            <img src="src/assets/APRENDE-removebg-preview.png" alt="Logo" className="image-logo"/>
          </div>
          <aside>
            <Button variant="outline" className="w-full">
              Inicio
            </Button>
            <strong className="text-course">
              CURSOS
            </strong>
            <Button variant="outline" className="w-full">
              Aprende Javascript
            </Button>
          </aside>
        </ScrollArea>

        <div className="container-home">
          <Button variant="outline" className="w-full" style={{borderColor:'gray'}}>
            (Usuario)
          </Button>
        </div>

      </header>
      <div className="container-welcome">
        <ScrollArea className="h-[800px] w-[500px] tab-content">

          <strong className="text-welcome">
            Bienvenido, 
          </strong>
          <strong className="text-welcome-2">
            (Usuario)!
          </strong>

          <div className="text-welcome-3">
            VOLVER A ENTRAR
          </div>

          <div className="container-course">
            <strong>Conceptos Básicos</strong>
            <h2>Progreso del módulo:</h2>
            <Button>Continuar Curso</Button>         
          </div>
        </ScrollArea>
      </div>
    </article>
  )
}
