import axios from 'axios';
import authService from './authService';

const apiEndpoint = 'https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1';

const userService = {
    // Función para obtener un usuario
    getUser: async (userId) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la solicitud de usuario.');
            return null;
        }

        try {
            const response = await axios.get(`${apiEndpoint}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error userService.js al obtener datos del usuario:', error);
            return null;
        }
    },


    // Función para obtener a todos los usuarios
    getUsers: async () => {
        const token = authService.getToken();
        const response = await axios.get(`${apiEndpoint}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    // Función para crear un usuario
    createUser: async (userData) => {
        const token = authService.getToken();
        const response = await axios.post(`${apiEndpoint}/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    // Función para actualizar al usuario actual
    updateUser: async (userId, userData) => {
        const token = authService.getToken();
        const response = await axios.put(`${apiEndpoint}/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    // Función para actualizar el rol de un usuario
    updateUserRole: async (userId, userData) => {
        const token = authService.getToken();
        const response = await axios.put(`${apiEndpoint}/users/${userId}/role`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    // Función para eliminar un usuario
    deleteUser: async (userId) => {
        const token = authService.getToken();
        const response = await axios.delete(`${apiEndpoint}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
};

export default userService;
