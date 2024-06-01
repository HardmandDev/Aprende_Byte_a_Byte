import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"

function Header() {
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
            <Link to="/login" className="hover:text-gray-400">
              <Button> Login </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
