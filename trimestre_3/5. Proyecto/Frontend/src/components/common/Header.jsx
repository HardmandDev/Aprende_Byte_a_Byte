import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useState } from 'react';




export default function Header() {
  const [valor, setValor] = useState("Register");
  const [link, setLink] = useState("/sign-up");
  
  const handleButtonClick = () => {
    if (valor === "Register" && link === "/sign-up") {
      setValor("LogIn");
      setLink("/login");
    } else if (valor === "LogIn" && link === "/login") {
      setValor("Register");
      setLink("/sign-up");
    }
    console.log(valor + link);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-center">
          Aprende Byte a Byte
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-400">
              Profile
            </Link>
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


