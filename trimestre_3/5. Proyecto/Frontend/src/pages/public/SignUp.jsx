import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "../../services/authService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    captchaInput: "",
  });
  const [captchaNumbers, setCaptchaNumbers] = useState({ num1: 0, num2: 0 });
  const [captchaResult, setCaptchaResult] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    const num2 = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    const result = num1 + num2;
    setCaptchaNumbers({ num1, num2 });
    setCaptchaResult(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(formData.captchaInput) !== captchaResult) {
      setError("La respuesta del captcha es incorrecta. Por favor, intenta de nuevo.");
      generateCaptcha(); // Generar un nuevo captcha
      return;
    }

    try {
      const response = await authService.signup(formData);
      console.log(response.data);
      alert("La cuenta se creó exitosamente");
      navigate("/auth/login"); // Redirige al usuario a la página de inicio de sesión después de registrarse
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setError("Ocurrió un error al intentar registrarse. Por favor, intenta de nuevo más tarde.");
    }
  };

  // Generar el captcha al cargar el componente
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">Nombres</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="Andres Felipe"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Apellidos</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Rodriguez Gonzalez"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="andres@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="captchaInput">Resuelve la suma: {captchaNumbers.num1} + {captchaNumbers.num2} =</Label>
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
            <Button type="submit" className="w-full">
              Crear una cuenta
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/auth/login" className="underline">
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUp;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import authService from "../../services/authService";
// import useNavigateToRole from "../../hooks/useNavigateToRole";

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const navigateToRole = useNavigateToRole();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await authService.signup(formData);
//       console.log(response.data);
//       alert("La cuenta se creó exitosamente");
//       navigate("/auth/login"); // Redirige al usuario a la página de inicio de sesión después de registrarse
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (authService.isAuthenticated()) {
//   //     const decodedToken = authService.decodeToken();
//   //     navigateToRole(`${decodedToken.role}/dashboard`);
//   //   } 
//   // }, [navigateToRole]);

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Registro</CardTitle>
//         <CardDescription>
//           Ingresa tu información para crear una cuenta
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="first_name">Nombres</Label>
//                 <Input
//                   id="first_name"
//                   name="first_name"
//                   placeholder="Andres Felipe"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="last_name">Apellidos</Label>
//                 <Input
//                   id="last_name"
//                   name="last_name"
//                   placeholder="Rodriguez Gonzalez"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="email">Correo electrónico</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="andres@correo.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Crear una cuenta
//             </Button>
//           </div>
//           <div className="mt-4 text-center text-sm">
//             ¿Ya tienes una cuenta? <br />
//             <Link to="/auth/login" className="underline">
//               Inicia sesión
//             </Link>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
