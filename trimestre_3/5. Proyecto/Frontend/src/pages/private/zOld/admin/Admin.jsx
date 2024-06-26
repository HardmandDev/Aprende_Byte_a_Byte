import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import courseService from '../../../../services/courseService';

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

  const handleAccept = async (courseId) => {
    try {
      const updatedCourse = await courseService.updateCourseStatus(courseId, 'approved');
      if (updatedCourse) {
        const updatedCourses = courses.map(course=> {
          if (course.id === courseId) {
            return { ...course, status: 'approved' };
          }
          return course;
        });
        setCourses(updatedCourses);
      }
    } catch (error) {
      console.error('Error al aceptar curso:', error);
    }
  };

  const handleReject = async (courseId) => {
    try {
      const updatedCourse = await courseService.updateCourseStatus(courseId, 'rejected');
      if (updatedCourse) {
        const updatedCourses = courses.map(course => {
          if (course.id === courseId) {
            return { ...course, status: 'rejected' };
          }
          return course;
        });
        setCourses(updatedCourses);
      }
    } catch (error) {
      console.error('Error al rechazar curso:', error);
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
          <TableHead className={classHead}>ID Curso</TableHead>
          <TableHead className={classHead}>Nombre</TableHead>
          <TableHead className={classHead}>Orden</TableHead>
          <TableHead className={classHead}>ID Profesor</TableHead>
          <TableHead className={classHead}>Estado</TableHead>
          <TableHead className={classHead}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className={classCell}>{abbreviateId(course.id)}</TableCell>
            <TableCell className={classCell}>{abbreviateId(course.course_id)}</TableCell>
            <TableCell className={classCell}>{course.course_name}</TableCell>
            <TableCell className={classCell}>{course.course_order}</TableCell>
            <TableCell className={classCell}>{abbreviateId(course.user_teacher_id)}</TableCell>
            <TableCell className={classCell}>{statusMap[course.status]}</TableCell>
            <TableCell className={classCell}>
              <Button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded my-1" onClick={() => handleAccept(course.id)}>
                Aceptar
              </Button>
              <Button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded my-1" onClick={() => handleReject(course.id)}>
                Rechazar
              </Button>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableCourses;
