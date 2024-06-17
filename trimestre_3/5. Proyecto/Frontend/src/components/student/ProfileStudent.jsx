import React from "react";
import "./ProfileStudent.css";
import { Button } from "@/components/ui/button"
import Sidebar from '@/components/auth/student/Sidebar';
import './ProfileStudent.css';

export default function ProfileStudent() {
  return (
    <article className="tab-container">
      <Sidebar />
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
              <Button type="submit" variant="default" className="w-full bg-red-500 text-white px-4 py-2 rounded mt-4">Guardar</Button>
            </form>
          </div>
        </main>
      </div>
    </article>
  );
}