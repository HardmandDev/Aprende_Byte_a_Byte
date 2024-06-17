import {CourseCard} from "../components/auth/Admin/AdminCourse";
import React from "react";
import "./Admin.css";

function Admin () {

    const [courses, setCourses] = React.useState([
      { id: 1, name: "Curso 1", description: "Descripción del curso 1" },
      { id: 2, name: "Curso 2", description: "Descripción del curso 2" },
    ]);
  
    const handleAccept = (id) => {
      console.log(`Curso ${id} aceptado`);
    };
  
    const handleReject = (id) => {
      console.log(`Curso ${id} rechazado`);
    };
  
    return (
      <div className="admin">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>
    );
  }

export default Admin;
