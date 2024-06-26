import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from "../../services/authService";
import useNavigateToRole from "../../hooks/useNavigateToRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaInput: '',
  });
  const [captchaNumbers, setCaptchaNumbers] = useState({ num1: 0, num2: 0 });
  const [captchaResult, setCaptchaResult] = useState(0);
  const [error, setError] = useState("");
  const navigateToRole = useNavigateToRole();

  useEffect(() => {
    generateCaptcha();
  }, []); // Generar captcha al montar el componente

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    const num2 = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    const result = num1 + num2;
    setCaptchaNumbers({ num1, num2 });
    setCaptchaResult(result);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(formData.captchaInput) !== captchaResult) {
      setError("La respuesta del captcha es incorrecta. Por favor, intenta de nuevo.");
      generateCaptcha(); // Generar un nuevo captcha
      return;
    }

    try {
      const decodedToken = await authService.login(formData.email, formData.password);
      console.log("Inicio de sesión exitoso:", decodedToken);
      navigateToRole(decodedToken.role);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      if (error.response && error.response.status === 401) {
        setError("Correo o contraseña incorrectos. Por favor, verifica tus credenciales.");
      } else {
        setError("Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde.");
      }
    }
  };

  return (
    <Card className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Iniciar sesión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" method='POST' onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@abb.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="captchaInput">Resuelve la suma: {captchaNumbers.num1} + {captchaNumbers.num2} =</Label>
            </div>
            <Input
              id="captchaInput"
              name="captchaInput"
              type="text"
              value={formData.captchaInput}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-1">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
          >
            Iniciar sesión
          </Button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link to="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Regístrate
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
