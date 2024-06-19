import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import courseService from '../../../services/courseService';

const CreateCourseAndLessons = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    levelId: '',
  });

  const [lessonsData, setLessonsData] = useState([]);

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleLessonInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLessons = [...lessonsData];
    updatedLessons[index][name] = value;
    setLessonsData(updatedLessons);
  };

  const handleAddLesson = () => {
    setLessonsData([...lessonsData, { name: '', description: '' }]);
  };

  const handleRemoveLesson = (index) => {
    const updatedLessons = [...lessonsData];
    updatedLessons.splice(index, 1);
    setLessonsData(updatedLessons);
  };

  const handleCreateCourse = async () => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      // Obtener el ID del curso creado para asociar las lecciones
      const courseId = newCourse.id;
      // Crear cada lección asociada al curso
      await Promise.all(lessonsData.map(lesson => courseService.createLesson(courseId, lesson)));
      // Reiniciar los datos del formulario después de la creación exitosa
      setCourseData({ name: '', description: '', imageUrl: '', levelId: '' });
      setLessonsData([]);
      alert('Curso y lecciones creados exitosamente.');
    } catch (error) {
      console.error('Error al crear curso y lecciones:', error);
      alert('Error al crear curso y lecciones.');
    }
  };

  return (
    <Form>
      <FormItem>
        <FormLabel htmlFor="name">Nombre del Curso:</FormLabel>
        <Input type="text" id="name" name="name" value={courseData.name} onChange={handleCourseInputChange} />
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="description">Descripción del Curso:</FormLabel>
        <Input as="textarea" id="description" name="description" value={courseData.description} onChange={handleCourseInputChange} />
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="imageUrl">URL de la Imagen:</FormLabel>
        <Input type="text" id="imageUrl" name="imageUrl" value={courseData.imageUrl} onChange={handleCourseInputChange} />
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="levelId">ID del Nivel:</FormLabel>
        <Input type="text" id="levelId" name="levelId" value={courseData.levelId} onChange={handleCourseInputChange} />
      </FormItem>
      {lessonsData.map((lesson, index) => (
        <div key={index}>
          <h3>Lección {index + 1}</h3>
          <FormItem>
            <FormLabel htmlFor={`lessonName${index}`}>Nombre de la Lección:</FormLabel>
            <Input type="text" id={`lessonName${index}`} name="name" value={lesson.name} onChange={(e) => handleLessonInputChange(e, index)} />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor={`lessonDescription${index}`}>Descripción de la Lección:</FormLabel>
            <Input as="textarea" id={`lessonDescription${index}`} name="description" value={lesson.description} onChange={(e) => handleLessonInputChange(e, index)} />
          </FormItem>
          <Button onClick={() => handleRemoveLesson(index)}>Eliminar Lección</Button>
        </div>
      ))}
      <Button onClick={handleAddLesson}>Agregar Lección</Button>
      <Button onClick={handleCreateCourse}>Crear Curso y Lecciones</Button>
    </Form>
  );
};

export default CreateCourseAndLessons;
