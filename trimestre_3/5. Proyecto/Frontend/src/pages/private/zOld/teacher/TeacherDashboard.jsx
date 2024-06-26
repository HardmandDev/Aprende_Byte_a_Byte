import { Link } from "react-router-dom";
// import courseService from "../../../services/courseService";
// import lessonService from "../../../services/lessonService";
// import student_progressService from '../../../services/student_progressService'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SupportDashboard() {
  // const [courses, setCourses] = useState([]);
  // const [selectedCourse, setSelectedCourse] = useState(null);

  // useEffect(() => {
  //   courseService.getCourses().then((courses) => {
  //     setCourses(courses);
  //   });
  // }, []);

  // const handleCourseClick = async (course) => {
  //   setSelectedCourse(course);
  // };

  return (
    <div className="flex flex-col gap-4 mt-4 me-4">
      {/* Card para Manage Courses */}
      <Link to="/teacher/create-course">
        <Card>
          <CardHeader>
            <CardTitle>Crear Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Crear cursos en el sistema.</CardDescription>
          </CardContent>
          <CardFooter>
            <span className="text-sm text-gray-500">
              Administrar cursos del sistema
            </span>
          </CardFooter>
        </Card>
      </Link>
      {/* Card para Manage Lessons */}
      <Link to="/admin/lessons">
        <Card>
          <CardHeader>
            <CardTitle>Administrar Lecciones</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Gestiona las lecciones del sistema.</CardDescription>
          </CardContent>
          <CardFooter>
            <span className="text-sm text-gray-500">
              Administrar lecciones del sistema
            </span>
          </CardFooter>
        </Card>
      </Link>
      {/* Card para Manage Student Progress */}
      {/* <Link to="/support/manage-student-progress">
        <Card>
          <CardHeader>
            <CardTitle>Administrar Progreso de Estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Gestiona el progreso de los estudiantes.</CardDescription>
          </CardContent>
          <CardFooter>
            <span className="text-sm text-gray-500">
              Administrar progreso de estudiantes
            </span>
          </CardFooter>
        </Card>
      </Link> */}

      { /* Analizar, aunque creo que estaría fuera del rol de support */}
      {/* <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Cursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="cursor-pointer">
              <Link to={`/courses/${course.id}/lessons/${latestLessonId}`}>
                <Card onClick={() => handleCourseClick(course)}>
                  <CardHeader>
                    <CardTitle>{course.course_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={course.image_url} alt={course.course_name} />
                    <CardDescription>{course.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {course.level_id}
                      </span>
                      <span className="text-sm text-gray-500">{course.price}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {selectedCourse && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Detalles del curso</h1>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Nombre del curso:</p>
            <p className="text-lg">{selectedCourse.course_name}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Descripción del curso:</p>
            <p className="text-lg">{selectedCourse.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Nivel del curso:</p>
            <p className="text-lg">{selectedCourse.level_id}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Estado del curso:</p>
            <p className="text-lg">{selectedCourse.status}</p>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default SupportDashboard;
