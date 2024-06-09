import React from 'react';
import 'tailwindcss/tailwind.css';
// import Editor from '@monaco-editor/react'
const Lesson = () => {







  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <button className="bg-blue-800 px-3 py-1 rounded">Anterior</button>
        <h1 className="text-xl">INTRODUCCIÓN A JAVASCRIPT</h1>
        <button className="bg-blue-800 px-3 py-1 rounded">Siguiente</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Introducción a JavaScript</h2>
          <p>¡Hola! Bienvenido a Introducción a JavaScript...</p>
          <h3 className="text-md font-semibold mt-4">Variables</h3>
          <p>Una característica clave de los lenguajes de programación es...</p>
          <pre className="bg-gray-200 p-2 mt-2 rounded">
            <code>
              const a = 3;
            </code>
          </pre>
          <p className="mt-2">En la línea de arriba a es nuestra variable...</p>
          <pre className="bg-gray-200 p-2 mt-2 rounded">
            <code>
              const a = 3;
              <br />
              module.exports = a;
            </code>
          </pre>
        </aside>

        <main className="w-2/3 bg-white p-4 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Tarea</h2>
              <button className="bg-green-500 text-white px-3 py-1 rounded">Run Tests</button>
            </div>
            <textarea
              className="w-full h-full p-2 border border-gray-300 rounded"
              defaultValue={`const a = 5;\n\nmodule.exports = a;`}
            />
          </div>
          <div className="bg-gray-100 p-4 mt-2 rounded">
            <h3 className="text-md font-semibold">Test Output</h3>
            <p className="text-green-700">a should equal 5 - Test Passed</p>
          </div>
        </main>
      </div>
    </div>
  )
};

export default Lesson;
