import { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import lessonService from '../../../../services/lessonService';
import authService from '../../../../services/authService';

// Componente Header
const Header = ({ title }) => (
  <div className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
    <button className="bg-blue-800 px-3 py-1 rounded">Anterior</button>
    <h1 className="text-xl">{title}</h1>
    <button className="bg-blue-800 px-3 py-1 rounded">Siguiente</button>
  </div>
);

const Sidebar = () => {
  const { id } = useParams();
  const user = authService.getUser();
  const [lessonName, setLessonName] = useState('Título de la lección...');
  const [taskContent, setTaskContent] = useState(`Escribe la tarea aquí...`);
  const [detailsContent, setDetailsContent] = useState(`Escribe los detalles aquí...`);

  console.log(id)
  const handleTaskChange = (event) => {
    setTaskContent(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetailsContent(event.target.value);
  };

  const handleCreateLesson = async () => {
    const lessonData = {
      user_teacher_id: user.id,
      course_id: id,
      lesson_name: lessonName,
      task: taskContent,
      details: detailsContent,
    };

    const response = await lessonService.createLesson(lessonData);
    if (response) {
      console.log(response);
      alert('Lección creada exitosamente');
    } else {
      console.log('Error al crear la lección');
    }

  };

  return (
    <aside className="w-full lg:w-1/3 bg-gray-100 p-4 overflow-y-auto">
      <Tabs>
        <TabList>
          <Tab>Tarea</Tab>
          <Tab>Detalles</Tab>
        </TabList>

        <TabPanel>
          <textarea
            className="w-full h-40 bg-gray-200 p-2 rounded text-gray-800"
            value={taskContent}
            onChange={handleTaskChange}
            placeholder="Escribe la tarea aquí..."
          />
        </TabPanel>

        <TabPanel>
          <textarea
            className="w-full h-40 bg-gray-200 p-2 rounded text-gray-800"
            value={detailsContent}
            onChange={handleDetailsChange}
            placeholder="Escribe los detalles aquí..."
          />
        </TabPanel>
      </Tabs>

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCreateLesson}
      >
        Crear Lección
      </button>
    </aside>
  );
};
// Componente MainContent
const MainContent = ({ editorValue, onEditorChange, onRunTests, testOutput, testCode }) => (
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

// Componente Lesson
const Lesson = () => {
  const [editorContent, setEditorContent] = useState(`const a = 5;\nmodule.exports = a;`);
  const [testOutput, setTestOutput] = useState({ success: true, message: "a should equal 5 - Test Passed" });
  const testCode = `const a = require('./index.js');\nconst assert = require('assert');\n\ntry {\n  assert.strictEqual(a, 5);\n  console.log('a should equal 5 - Test Passed');\n} catch (error) {\n  console.log('a should equal 5 - Test Failed');\n}`;
  const { id, course_name } = useParams();
  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleRunTests = async () => {
    try {
      const response = await axios.post('https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1/users/:id', {
        code: editorContent,
      });

      const result = response.data;
      setTestOutput({ success: result.success, message: result.message });
      console.log('Resultado del endpoint:', result);
    } catch (error) {
      setTestOutput({ success: false, message: 'Error al enviar el código al endpoint.' });
      console.error('Error al enviar el código al endpoint:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header title={course_name} />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <MainContent
          editorValue={editorContent}
          onEditorChange={handleEditorChange}
          onRunTests={handleRunTests}
          testOutput={testOutput}
          testCode={testCode}
        />
      </div>
    </div>
  );
};

export default Lesson;
