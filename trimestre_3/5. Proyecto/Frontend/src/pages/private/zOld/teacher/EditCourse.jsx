import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import courseService from '../../../../services/courseService';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import authService from '../../../../services/authService';

const statusMap = {
  "pending": "Pendiente",
  "approved": "Aprobado",
  "rejected": "Rechazado"
};

const reverseStatusMap = {
  "Pendiente": "pending",
  "Aprobado": "approved",
  "Rechazado": "rejected"
};

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    course_name: '',
    description: '',
    image_url: '',
    status: ''
  });
  const [selectedStatus, setSelectedStatus] = useState("");

  const user = authService.getUser()

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const course = await courseService.getCourseById(id);
        const statusText = course.status ? statusMap[course.status] : "";
        setCourseData({ ...course, status: statusText });
        setSelectedStatus(statusText);
      } catch (error) {
        console.error('Error al obtener datos del curso:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCourseData({ ...courseData, status: reverseStatusMap[value] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevCourseData => ({ ...prevCourseData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCourse = await courseService.updateCourse(id, courseData);
      if (updatedCourse) {
        alert('Curso actualizado con éxito');
        navigate(`/${user.role}/courses`);
      } else {
        console.error('No se pudo actualizar los datos del curso.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error al actualizar los datos del curso:', error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor al actualizar los datos del curso.');
      } else {
        console.error('Error al enviar la solicitud de actualización:', error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Curso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre del Curso</label>
          <input
            type="text"
            name="course_name"
            className="w-full px-3 py-2 border rounded text-gray-700"
            value={courseData.course_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            className="w-full px-3 py-2 border rounded text-gray-700"
            value={courseData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">URL de la Imagen</label>
          <input
            type="text"
            name="image_url"
            className="w-full px-3 py-2 border rounded text-gray-700"
            value={courseData.image_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Estado</label>
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Aprobado">Aprobado</SelectItem>
                <SelectItem value="Rechazado">Rechazado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
