import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import ModeToggle from "@/components/mode-toggle"

export default function Header() {
  const [valor, setValor] = useState("Registrarse");
  const [link, setLink] = useState("/auth/signup");

  const handleButtonClick = () => {
    if (valor === "Registrarse" && link === "/auth/signup") {
      setValor("Iniciar sesión");
      setLink("/auth/login");
    } else if (valor === "Iniciar sesión" && link === "/auth/login") {
      setValor("Registrarse");
      setLink("/auth/signup");
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-0 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-center">
          <img src="/APRENDE-removebg-preview.png" alt="Logo" className="image-logo" />
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/courses" className="hover:text-gray-400">
              Cursos
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <Button onClick={handleButtonClick} className="hover:text-gray-400">
              <Link to={link}>
                {valor}
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}


