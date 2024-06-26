const courseModel = require('../models/courseModel')

const createCourse = async (req, res) => {
    try {
        const {
            user_teacher_id,
            course_name,
            description,
            level_id
        } = req.body;

        // 'imageFile' viene del campo 'name' del input de tipo file
        const image_url = `https://jp9dtqt5-3000.use2.devtunnels.ms/${req.file.path.replace(/\\/g, '/')}`; // Obtener la ruta donde multer ha guardado la imagen

        const newCourse = await courseModel.createCourse({
            user_teacher_id,
            course_name,
            description,
            image_url,
            level_id
        });

        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: 'Error creating course', details: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await courseModel.getCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
}

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.getCourseById(id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course' });
    }
}

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            user_teacher_id, 
            course_name, 
            description, 
            image_url, level_id 
        } = req.body;

        // Obtain the current course
        const course = await courseModel.getCourseById(id);

        // Update the user's fields with the values from the request body
        if (id) {
            course.id = id;
        }
        if (user_teacher_id) {
            course.user_teacher_id = user_teacher_id;
        }
        if (course_name) {
            course.course_name = course_name;
        }
        if (description) {
            course.description = description;
        }
        if (image_url) {
            course.image_url = image_url;
        }
        if (level_id) {
            course.level_id = level_id;
        }

        // Update the user in the database
        const updatedCourse = await courseModel.updateCourse(course);

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: 'Error updating course', details: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await courseModel.deleteCourse(id);
        res.status(200).json({ message: 'Course deleted successfully' }, deletedCourse);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting course', details: error.message });
    }
}

module.exports = {
    createCourse,
    updateCourse,
    getCourses,
    getCourseById,
    deleteCourse,
}