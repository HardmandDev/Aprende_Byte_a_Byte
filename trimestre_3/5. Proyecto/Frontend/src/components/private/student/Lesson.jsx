import React, { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../../index.css';

import lessonService from '../../../services/lessonService';


// Componente Header
export const Header = ({ title }) => (
  <div className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
    <button className="bg-blue-800 px-3 py-1 rounded">Anterior</button>
    <h1 className="text-xl">{title}</h1>
    <button className="bg-blue-800 px-3 py-1 rounded">Siguiente</button>
  </div>
);

// Componente Sidebar
export const Sidebar = () => (
  <aside className="w-full lg:w-1/3 bg-gray-100 p-4 overflow-y-auto">
    <Tabs>
      <TabList>
        <Tab>Tarea</Tab>
        <Tab>Detalles</Tab>
      </TabList>

      <TabPanel>
        <h2 className="text-lg font-semibold mb-2">Introducción a JavaScript</h2>
        <p>
          ¡Hola! Bienvenido a la Introducción a JavaScript. Este panel es su tarea. ¡Le
          dirá cómo completar esta etapa de codificación para seguir adelante!
        </p>
        <h3 className="text-md font-semibold mt-4">Variables</h3>
        <p>
          Una característica clave de los lenguajes de programación es la capacidad
          de almacenar un valor para su uso posterior.
        </p>
        <p>
          Almacenamos valores en algo llamado <strong>variable</strong>. Veamos
          cómo se ve esto en una línea de código:
        </p>
        <pre className="bg-gray-200 p-2 mt-2 rounded">
          <code>const a = 3;</code>
        </pre>
        <p className="mt-2">
          En la línea de arriba, <code>a</code> es nuestra variable. El número <code>3</code> es el
          valor que nos gustaría almacenar en <code>a</code>. Finalmente, la palabra <strong>const</strong> es una palabra clave utilizada para declarar <code>a</code>
          como un valor constante. Podemos acceder al valor <code>3</code> haciendo referencia a
          la variable en una futura línea de código.
        </p>
        <pre className="bg-gray-200 p-2 mt-2 rounded">
          <code>
            const a = 3;
            <br />
            module.exports = a;
          </code>
        </pre>
      </TabPanel>

      <TabPanel>
        <h2 className="text-lg font-semibold mb-2">Detalles sobre Variables</h2>
        <p>
          Las variables son fundamentales en cualquier lenguaje de programación. En JavaScript, 
          existen varios tipos de variables, como <code>var</code>, <code>let</code> y <code>const</code>.
        </p>
        <p>
          - <code>var</code>: Es una forma antigua de declarar variables. Tiene un alcance de función.
        </p>
        <p>
          - <code>let</code>: Introducido en ES6, tiene un alcance de bloque y es más seguro que <code>var</code>.
        </p>
        <p>
          - <code>const</code>: Similar a <code>let</code>, pero la variable no puede ser reasignada una vez definida.
        </p>
        <pre className="bg-gray-200 p-2 mt-2 rounded">
          <code>
            let b = 2;
            <br />
            const c = 5;
          </code>
        </pre>
        <p className="mt-2">
          Utilizar <code>let</code> y <code>const</code> ayuda a escribir código más predecible y menos propenso a errores.
        </p>
      </TabPanel>
    </Tabs>
  </aside>
);

// Componente MainContent
export const MainContent = ({ editorValue, onEditorChange, onRunTests, testOutput, testCode }) => (
  <main className="w-full lg:w-2/3 bg-white p-4 flex flex-col">
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Tarea</h2>
        <button onClick={onRunTests} className="bg-green-500 text-white px-3 py-1 rounded">
          Run Tests
        </button>
      </div>
      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Test Code</Tab>
        </TabList>

        <TabPanel>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={editorValue}
            onChange={onEditorChange}
            className="border border-gray-300 rounded"
          />
        </TabPanel>
        <TabPanel>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={testCode}
            options={{ readOnly: true }}
            className="border border-gray-300 rounded"
          />
        </TabPanel>
      </Tabs>
    </div>
    <div className="bg-gray-100 p-4 mt-2 rounded">
      <h3 className="text-md font-semibold">Test Output</h3>
      <p className={testOutput.success ? "text-green-700" : "text-red-700"}>{testOutput.message}</p>
    </div>
  </main>
);

// Componente principal Lesson

