import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateCourseAndLessons = () => {
  const { register, handleSubmit, reset } = useForm();
  const [lessonsData, setLessonsData] = useState([]);

  const handleAddLesson = () => {
    setLessonsData([...lessonsData, { name: '', description: '' }]);
  };

  const handleRemoveLesson = (index) => {
    const updatedLessons = [...lessonsData];
    updatedLessons.splice(index, 1);
    setLessonsData(updatedLessons);
  };

  const handleCreateCourse = async (data) => {
    try {
      // Aquí iría tu lógica para crear el curso y las lecciones
      reset();
      setLessonsData([]);
      alert('Curso y lecciones creados exitosamente.');
    } catch (error) {
      console.error('Error al crear curso y lecciones:', error);
      alert('Error al crear curso y lecciones.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateCourse)} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del Curso:
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción del Curso:
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {lessonsData.map((lesson, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-medium mb-2">Lección {index + 1}</h3>
          <div className="mb-2">
            <label htmlFor={`lessonName${index}`} className="block text-sm font-medium text-gray-700">
              Nombre de la Lección:
            </label>
            <input
              type="text"
              id={`lessonName${index}`}
              {...register(`lessons[${index}].name`)}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor={`lessonDescription${index}`} className="block text-sm font-medium text-gray-700">
              Descripción de la Lección:
            </label>
            <textarea
              id={`lessonDescription${index}`}
              {...register(`lessons[${index}].description`)}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveLesson(index)}
            className="inline-block px-4 py-2 text-sm font-medium text-red-700 bg-transparent border border-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Eliminar Lección
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddLesson}
        className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-700 bg-transparent border border-green-700 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Agregar Lección
      </button>
      <button
        type="submit"
        className="inline-block px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Crear Curso y Lecciones
      </button>
    </form>
  );
};

export default CreateCourseAndLessons;
