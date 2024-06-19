import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiEndpoint = "https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1/users/login";

const authService = {
    login: async (email, password) => {
        const response = await axios.post(apiEndpoint, { email, password });
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            return decoded; // Devuelve la información decodificada del JWT
        } else {
            throw new Error("Inicio de sesión fallido");
        }
    },
    getToken: () => {
        return localStorage.getItem('token');
    },
    decodeToken: () => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token);
        }
        return null;
    },
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Verifica si el token no ha expirado
                if (decodedToken.exp * 1000 > Date.now()) {
                    return true;
                }
            } catch (error) {
                // Maneja errores al decodificar el token
                console.error('Error al decodificar el token:', error);
            }
        }
        return false;
    }
};

export default authService;
