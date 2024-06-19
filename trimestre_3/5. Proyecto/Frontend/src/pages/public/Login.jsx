import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateToRole = (roleId) => {
    switch (roleId) {
      case '8c890948-5402-40e6-a38d-6f2df9e3b4db':
        navigate('/student');
        break;
      case 'f3d9324c-ecbd-4d1b-bc92-dbe75ff149db':
        navigate('/teacher');
        break;
      case '7bf4770d-ab11-4aba-9e0a-991b3f162488':
        navigate('/admin');
        break;
      case '6126917f-f7e3-4ee8-a5a1-16e3b128f26b':
        navigate('/support');
        break;
      default:
        navigate('/profile');
    }
  };

  useEffect(() => {
    const handleNavigation = () => {
      if (authService.isAuthenticated()) {
        const decodedToken = authService.decodeToken();
        navigateToRole(decodedToken.role_id);
      }
    };

    handleNavigation(); // Llamar la función para manejar la navegación

    // Puedes optar por agregar o no agregar dependencias aquí
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decodedUser = await authService.login(formData.email, formData.password);
      console.log('Datos decodificados del JWT:', decodedUser);
  
      if (!decodedUser || !decodedUser.role_id) {
        throw new Error('Usuario no válido o sin rol definido');
      }
  
      login(formData.email, formData.password); // Actualiza el contexto con los datos del usuario
      navigateToRole(decodedUser.role_id); // Redirige según el rol del usuario
  
      // Comprobar si hay un token JWT en localStorage después de iniciar sesión
      const token = authService.getToken();
      if (token) {
        const decodedToken = authService.decodeToken(token);
        navigateToRole(decodedToken.role_id);
      } else {
        throw new Error('No se encontró un token después de iniciar sesión');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Iniciar sesión
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method='POST' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Correo
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="aprende-byte@gmail.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesión
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link to="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
