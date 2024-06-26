import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from "./routes/PrivateRoutes";
// import StudentRoutes from './routes/StudentRoutes';
// import TeacherRoutes from './routes/TeacherRoutes';
// import SupportRoutes from './routes/SupportRoutes';
// import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <PublicRoutes />
          <PrivateRoutes />
          {/* 
          <StudentRoutes />
          <TeacherRoutes />
          <SupportRoutes />
          <AdminRoutes /> 
          */}
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
