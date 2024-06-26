import axios from 'axios';
import authService from './authService';

const apiEndpoint = "https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1";

const lessonService = {
    getLessonById: async (id) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la solicitud de usuario.');
            return null;
        }

        try {
            const response = await axios.get(`${apiEndpoint}/lesson/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener datos de la lección:', error);
            return null;
        }
    },

    getLessons: async () => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la solicitud de cursos.');
            return null;
        }

        try {
            const response = await axios.get(`${apiEndpoint}/lessons/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener datos de los cursos:', error);
            return null;
        }
    },

    createLesson: async (lessonData) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la creación de cursos.');
            return null;
        }

        try {
            const response = await axios.post(`${apiEndpoint}/lessons`, lessonData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear curso:', error);
            return null;
        }
    },

    updateLesson: async (id, courseData) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la actualización de cursos.');
            return null;
        }

        try {
            const response = await axios.put(`${apiEndpoint}/courses/${id}`, courseData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar curso:', error);
            return null;
        }
    },

    deleteLesson: async (id) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la eliminación de cursos.');
            return null;
        }

        try {
            const response = await axios.delete(`${apiEndpoint}/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar curso:', error);
            return null;
        }
    },

    updateLessonStatus: async (lessonId, status) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la actualización de estado del curso.');
            return null;
        }

        try {
            const response = await axios.put(`${apiEndpoint}/status/lesson/${lessonId}`, {
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Respuesta de la actualización de la lección:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar estado de la lección:', error);
            return null;
        }
    },
};

export default lessonService;