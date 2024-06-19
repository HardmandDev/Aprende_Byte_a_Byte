import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import courseService from '../../../services/courseService';

const roleMap = {
  "8c890948-5402-40e6-a38d-6f2df9e3b4db": "student",
  "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db": "teacher",
  "6126917f-f7e3-4ee8-a5a1-16e3b128f26b": "support",
  "7bf4770d-ab11-4aba-9e0a-991b3f162488": "admin"
};

const statusMap = {
  "pending": "Pendiente",
  "approved": "Aprobado",
  "rejected": "Rechazado"
};

const Admin = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courseData = await courseService.getCourses();
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const handleAccept = async (id) => {
    try {
      await courseService.updateCourseStatus(id, 'approved');
      // Actualizar la lista de cursos después de la aprobación
      const updatedCourses = courses.map(course => {
        if (course.id === id) {
          course.status = 'approved';
        }
        return course;
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error al aceptar curso:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await courseService.updateCourseStatus(id, 'rejected');
      // Actualizar la lista de cursos después del rechazo
      const updatedCourses = courses.map(course => {
        if (course.id === id) {
          course.status = 'rejected';
        }
        return course;
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error al rechazar curso:', error);
    }
  };

  const classHead = 'px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider';
  const classCell = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200';

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead className={classHead}>ID</TableHead>
          <TableHead className={classHead}>Nombre</TableHead>
          <TableHead className={classHead}>Descripción</TableHead>
          <TableHead className={classHead}>Imagen</TableHead>
          <TableHead className={classHead}>Nivel</TableHead>
          <TableHead className={classHead}>Teacher</TableHead>
          <TableHead className={classHead}>Admin</TableHead>
          <TableHead className={classHead}>Estado</TableHead>
          <TableHead className={classHead}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className={classCell}>{course.id}</TableCell>
            <TableCell className={classCell}>{course.course_name}</TableCell>
            <TableCell className={classCell}>{course.description}</TableCell>
            <TableCell className={classCell}>
              {course.image_url && <img src={course.image_url} alt="Course" />}
            </TableCell>
            <TableCell className={classCell}>{course.level_id}</TableCell>
            <TableCell className={classCell}>{roleMap[course.user_teacher_id] || course.user_teacher_id}</TableCell>
            <TableCell className={classCell}>{roleMap[course.user_admin_id] || course.user_admin_id}</TableCell>
            <TableCell className={classCell}>{statusMap[course.status]}</TableCell>
            <TableCell className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 flex justify-between">
              <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAccept(course.id)}>
                Aceptar
              </Button>
              <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleReject(course.id)}>
                Rechazar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Admin;
