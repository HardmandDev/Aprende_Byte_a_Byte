export function CourseCard({ course, onAccept, onReject }) { 

  
  return (
    <div className="course-card">
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <div className="course-actions">
        <button className="accept-button" onClick={() => onAccept(course.id)}>
          Aceptar
        </button>
        <button className="reject-button" onClick={() => onReject(course.id)}>
          Rechazar
        </button>
      </div>
    </div>
  );
  
}

