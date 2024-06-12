import React from "react";
import "./ProfileStudent.css";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export default function ProfileStudent() {
  return (
    <article className="tab-container">
      <div className="scrollArea-container">
        <ScrollArea className="h-[780px] w-[300px] rounded-md border p-7" style={{ borderColor: 'gray' }}>
          <div className="flex justify-center items-center mb-4">
            <img src="src/assets/Logo.png" alt="Logo" className="image-logo" />
          </div>
          <aside>
            <Button variant="outline" className="w-full">
              <div className="button-content">
                <img src="https://university.alchemy.com/assets/home_logo.8e92adf7.svg" alt="Inicio" className="image-home" />
                <span>Inicio</span>
              </div>
            </Button>
            <strong className="text-course">CURSOS</strong>

            <Button variant="outline" className="w-full">
              <div className="button-content">
                <img src="https://www.alchemy.com/university/_next/static/media/solidity-course-icon.79d288cd.svg" alt="Js" className="image-home" />
                <span>Aprende Python</span>
              </div>
            </Button>

            <Button variant="outline" className="w-full">
              <div className="button-content">
                <img src="https://university.alchemy.com/assets/js_logo_drawer.384f31cc.svg" alt="Js" className="image-home" />
                <span>Aprende Javascript</span>
              </div>
            </Button>

            <Button variant="outline" className="w-full">
              <div className="button-content">
                <img src="https://www.alchemy.com/university/_next/static/media/eth-course-icon.3bb938e2.svg" alt="Js" className="image-home" />
                <span>Aprende Java</span>
              </div>
            </Button>

            <strong className="text-course">LOGROS</strong>
            <Button variant="outline" className="w-full">
              <div className="button-content">
                <img src="https://university.alchemy.com/cert-icon.svg" alt="Certificaciones" className="image-home" />
                <span>Certificaciones</span>
              </div>
            </Button>
          </aside>
        

            <div className="container-home">
              <Button variant="outline" className="w-full" style={{ borderColor: 'gray' }}>
                Persona
              </Button>
            </div>
            </ScrollArea>
          </div>
        

      <div className="profile-config-container">
        <main className="flex flex-col items-center w-full flex-1 px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Configuración del perfil</h2>
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Nombres</label>
                <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="Carlos" />
              </div>
              <div>
                <label className="block text-gray-700">Apellidos</label>
                <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="Rodríguez Díaz" />
              </div>
              <div>
                <label className="block text-gray-700">Tipo de documento</label>
                <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="C.C." />
              </div>
              <div>
                <label className="block text-gray-700">Número de documento</label>
                <input type="text" className="w-full px-3 py-2 border rounded" defaultValue="1.234.567.890" />
              </div>
              <div>
                <label className="block text-gray-700">Correo</label>
                <input type="email" className="w-full px-3 py-2 border rounded" defaultValue="hardmandsaga@gmail.com" />
              </div>
              <button type="submit" className="w-full bg-emerald-500 text-white px-4 py-2 rounded mt-4">Guardar</button>
            </form>
          </div>
        </main>
      </div>
      <div className="top-buttons">
        <Button variant="outline" className="cursos-button">
          Cursos
        </Button>
        <Button variant="outline">
          Salir
        </Button>
      </div>
    </article>
  );
}