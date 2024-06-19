import axios from 'axios';
import authService from './authService';

const apiEndpoint = "https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1";

const courseService = {
    getCourse: async (id) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la solicitud de usuario.');
            return null;
        }

        try {
            const response = await axios.get(`${apiEndpoint}/courses${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
                        console.error('Error al obtener datos del curso:', error);
            return null;
        }
    },

    getCourses: async () => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la solicitud de cursos.');
            return null;
        }

        try {
            const response = await axios.get(`${apiEndpoint}/courses/`, {
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

    createCourse: async (courseData) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la creación de cursos.');
            return null;
        }

        try {
            const response = await axios.post(`${apiEndpoint}/courses/create`, courseData, {
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

    updateCourse: async (id, courseData) => {
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

    deleteCourse: async (id) => {
        const token = authService.getToken();
        if (!token) {
            console.error('Token no encontrado para la eliminación de cursos.');
            return null;
        }

        try {
            const response = await             axios.delete(`${apiEndpoint}/courses/${id}`, {
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

    updateCourseStatus: async (courseId, status, userAdminId) => {
        const token = authService.getToken();
        if (!token) {
          console.error('Token no encontrado para la actualización de estado del curso.');
          return null;
        }
    
        try {
          const response = await axios.put(`${apiEndpoint}/status/${courseId}`, {
            status,
            user_admin_id: userAdminId
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error al actualizar estado del curso:', error);
          return null;
        }
      },
};

export default courseService;