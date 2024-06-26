import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseService from "../../../services/courseService";
import lessonService from "../../../services/lessonService";
import student_progressService from '../../../services/student_progressService'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentProgress, setStudentProgress] = useState(null);
  const [latestLessonId, setLatestLessonId] = useState(null);

  useEffect(() => {
    courseService.getCourses().then((courses) => {
      setCourses(courses);
    });

    // Obtener el progreso del estudiante y el lesson_id más reciente
    student_progressService.getStudentProgress('461d8c4f-46a7-45b0-b11a-9fac50cd4262').then((progress) => {
      setStudentProgress(progress);

      if (progress && progress.length > 0) {
        const latestProgress = progress[progress.length - 1];
        setLatestLessonId(latestProgress.lesson_id);
      }
    });
  }, []);

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Mis cursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="cursor-pointer">
              {/* Utiliza Link para enlazar a la página de la lección */}
              <Link to={`/student/course/js/lesson/1`}>
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
      )}
    </div>
  );
}

export default StudentDashboard;
