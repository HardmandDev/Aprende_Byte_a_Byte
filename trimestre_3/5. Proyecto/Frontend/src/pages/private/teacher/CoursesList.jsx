import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import courseService from '../../../services/courseService';
import { useNavigate } from 'react-router-dom';

// const roleMap = {
//   "8c890948-5402-40e6-a38d-6f2df9e3b4db": "student",
//   "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db": "teacher",
//   "6126917f-f7e3-4ee8-a5a1-16e3b128f26b": "support",
//   "7bf4770d-ab11-4aba-9e0a-991b3f162488": "admin"
// };

const statusMap = {
  "pending": "Pendiente",
  "approved": "Aprobado",
  "rejected": "Rechazado"
};

const TableCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));


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

  const editCourse = (id) => {
    navigate(`/${currentUser.role}/courses/edit-course/${id}`);
};

  const deleteCourse = async (courseId) => {
    try {
      const response = await courseService.deleteCourse(courseId);
      setCourses(courses.filter(course => course.id !== courseId));
      console.log(response.data)

    } catch (error) {
      console.error('Error al eliminar curso:', error);
    }
  };


  const classHead = 'px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center';
  const classCell = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center';

  const abbreviateId = (id) => {
    if (!id) return '';
    return `${id.slice(0, 5)}...${id.slice(-5)}`;
  };
  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead className={classHead}>ID</TableHead>
          <TableHead className={classHead}>ID Profesor</TableHead>
          <TableHead className={classHead}>Nombre</TableHead>
          <TableHead className={classHead}>Imagen</TableHead>
          <TableHead className={classHead}>Descripción</TableHead>
          <TableHead className={classHead}>Estado</TableHead>
          <TableHead className={classHead}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className={classCell}>{abbreviateId(course.id)}</TableCell>
            <TableCell className={classCell}>{abbreviateId(course.user_teacher_id)}</TableCell>
            <TableCell className={classCell}>{course.course_name}</TableCell>
            <TableCell className={classCell}>
              <img crossOrigin="anonymous" src={course.image_url} alt={course.course_name} className="w-16 h-16 rounded-full" />
            </TableCell>
            <TableCell className={classCell}>{course.description}</TableCell>
            <TableCell className={classCell}>{statusMap[course.status]}</TableCell>
            <TableCell className={classCell}>
              <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold rounded my-1" onClick={() => editCourse(course.id)}>
                Editar
              </Button>
              <Button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded my-1" onClick={() => deleteCourse(course.id)}>
                Eliminar
              </Button>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableCourses;
