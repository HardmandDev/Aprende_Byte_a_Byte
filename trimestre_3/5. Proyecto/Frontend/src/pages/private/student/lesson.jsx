import {Header,Sidebar,MainContent} from "../components/auth/student/Lesson"


export default function Lesson() {
    const [editorContent, setEditorContent] = useState(`const a = 5;\nmodule.exports = a;`);
    const [testOutput, setTestOutput] = useState({ success: true, message: "a should equal 5 - Test Passed" });
    const testCode = `const a = require('./index.js');\nconst assert = require('assert');\n\ntry {\n  assert.strictEqual(a, 5);\n  console.log('a should equal 5 - Test Passed');\n} catch (error) {\n  console.log('a should equal 5 - Test Failed');\n}`;
  
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
        <Header title="INTRODUCCIÓN A JAVASCRIPT" />
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
  }