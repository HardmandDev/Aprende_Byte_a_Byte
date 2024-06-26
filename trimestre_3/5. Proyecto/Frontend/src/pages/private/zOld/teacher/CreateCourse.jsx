import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import authService from '../../../../services/authService';
import courseService from '../../../../services/courseService';

const levelIdMap = {
  '7f5ddbbe-06ad-4cc2-b760-e352a27bbe72': 'Principiante',
  '320dc77f-309c-40d6-a6b6-b0233a82eccd': 'Intermedio',
  'd51d9b28-333a-4966-a18e-05cde9c1f2bc': 'Avanzado',
};

const CreateCourseForm = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [levelId, setLevelId] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('user_teacher_id', authService.getUser().id);
      formData.append('course_name', courseName);
      formData.append('description', description);
      formData.append('level_id', levelId);
      formData.append('imageFile', imageFile);

      const response = await courseService.createCourse(formData);

      if (response && response.id) {
        alert('Curso creado exitosamente.');
        const courseId = response.id;
        navigate(`/teacher/courses/${courseId}/create-lesson`);
      } else {
        console.error('Error creating course');
        alert('Hubo un error al crear el curso.');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Hubo un error al crear el curso.');
    }
  };

  return (
    <form className="flex flex-col gap-4 m-4 p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="course_name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Nombre del curso"
      />
      <Textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción del curso"
      />
      <Input type="file" name="imageFile" onChange={handleFileChange} accept="image/*" />

      <Select onValueChange={(value) => setLevelId(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona el nivel" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(levelIdMap).map((key) => (
            <SelectItem key={key} value={key}>
              {levelIdMap[key]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Crear Curso</Button>
    </form>
  );
};

export default CreateCourseForm;
