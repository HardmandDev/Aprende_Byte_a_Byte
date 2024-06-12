import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [reviewOptions, setReviewOptions] = useState([]);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({});
  const [notifications, setNotifications] = useState([]);

  // Cargar cursos pendientes al montar el componente
  useEffect(() => {
    axios.get('/api/courses/pending')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Manejar clic en un curso para mostrar detalles
  const handleCourseClick = (courseId) => {
    axios.get(`/api/courses/${courseId}`)
      .then(response => {
        setCourseDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Manejar revisión de curso
  const handleReview = (courseId, status) => {
    axios.post(`/api/courses/${courseId}/review`, { status })
      .then(response => {
        setReviewOptions(response.data);
        setReviewHistory([...reviewHistory, { courseId, status, timestamp: new Date() }]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Manejar búsqueda de cursos
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    axios.get(`/api/courses/search?q=${e.target.value}`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Obtener estadísticas de los cursos
  const getStats = () => {
    axios.get('/api/courses/stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <h1>Administrador de cursos pendientes de revisión</h1>
      <section>
        <h2>Lista de cursos pendientes de revisión</h2>
        <ul>
          {courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase())).map((course) => (
            <li key={course.id} onClick={() => handleCourseClick(course.id)}>
              {course.title}
            </li>
          ))}
        </ul>
        <input type="search" value={searchQuery} onChange={handleSearch} placeholder="Buscar cursos" />
      </section>
      <section>
        <h2>Detalles del curso</h2>
        {courseDetails.title && (
          <div>
            <h3>{courseDetails.title}</h3>
            <p>{courseDetails.description}</p>
            <p>Contenido: {courseDetails.content}</p>
            <p>Requisitos: {courseDetails.requirements}</p>
            <p>Duración: {courseDetails.duration}</p>
          </div>
        )}
      </section>
      <section>
        <h2>Opciones de revisión</h2>
        {reviewOptions.map((option) => (
          <button key={option.id} onClick={() => handleReview(courseDetails.id, option.status)}>
            {option.label}
          </button>
        ))}
      </section>
      <section>
        <h2>Historial de revisiones</h2>
        <ul>
          {reviewHistory.map((history) => (
            <li key={history.timestamp}>
              {history.courseId} - {history.status} - {history.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Panel de estadísticas</h2>
        <ul>
          <li>Total de cursos revisados: {stats.totalCourses}</li>
          <li>Cursos aceptados: {stats.acceptedCourses}</li>
          <li>Cursos rechazados: {stats.rejectedCourses}</li>
        </ul>
      </section>
      <section>
        <h2>Notificaciones</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
