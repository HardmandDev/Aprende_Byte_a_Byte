import axios from 'axios';
import authService from './authService';

const apiEndpoint = 'https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1/student_progress';

const userService = {
    // Función para obtener un usuario
    getStudentProgress: async (userId) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la solicitud de usuario.');
            return null;
        }

        try {
            const response = await axios.get(`${apiEndpoint}/${userId}`, {
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
};

export default userService;
