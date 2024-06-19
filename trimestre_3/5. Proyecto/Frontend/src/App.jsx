import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PrivateRoutes />
        <PublicRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;