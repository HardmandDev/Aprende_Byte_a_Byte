const jwt = require('jsonwebtoken');
require('dotenv').config();

// Función para generar un JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    role_id: user.role_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  };
  const JWT_SECRET = process.env.JWT_SECRET; // Asegúrate de usar una clave secreta segura
  const options = {
    expiresIn: '1h' // El token expira en 1 hora
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = { generateToken };
