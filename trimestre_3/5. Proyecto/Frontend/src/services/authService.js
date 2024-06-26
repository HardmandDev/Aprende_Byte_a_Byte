import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const endpointLogin = import.meta.env.VITE_API_ENDPOINT_LOGIN;
const endpointSignup = import.meta.env.VITE_API_ENDPOINT_SIGNUP;

const authService = {
    signup: async (formData) => {
        try {
            const { first_name, last_name, email, password } = formData;
            if (!first_name || !last_name || !email || !password) {
                throw new Error("Por favor, completa todos los campos.");
            }
            const response = await axios.post(`${apiBaseUrl}${endpointSignup}`, {
                first_name,
                last_name,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.error("Error al registrarse:", error);
            throw new Error("Error al registrarse. Por favor, intenta de nuevo más tarde.")
        }
    },
    login: async (email, password) => {
        const response = await axios.post(`${apiBaseUrl}${endpointLogin}`, { email, password });
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            localStorage.setItem('user', JSON.stringify(decoded));
            return decoded;
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
        } else {
            return null;
        }
    },
    getUser: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? { id: user.id, role: user.role } : null;
    },
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    // El token ha expirado
                    return false;
                } else {
                    // El token es válido
                    return true;
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                return false;
            }
        } else {
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export default authService;
