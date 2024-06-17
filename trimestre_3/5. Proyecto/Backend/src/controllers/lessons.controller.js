const lessonModel = require('../models/lessonModel')

const createLesson = async (req, res) => {
    try {
        const {
            user_teacher_id,
            lesson_id,
            lesson_name,
            lesson_order,
            task,
            details,
        } = req.body;

        const newLesson = await lessonModel.createLesson(
            {
                user_teacher_id,
                lesson_id,
                lesson_name,
                lesson_order,
                task,
                details
            },

        );

        res.status(201).json(newLesson);
    } catch (error) {
        res.status(500).json({ error: 'Error creating lesson', details: error.message });
    }
}

const getLessons = async (req, res) => {
    try {
        const lessons = await lessonModel.getLessons();
        res.status(200).json(lessons)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons' })
    }
}

const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await lessonModel.getLessonById(id);

        if (lesson) {
            res.status(200).json(lesson);
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lesson' })
    }
}

const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            user_teacher_id,
            course_id,
            lesson_name,
            lesson_order,
            task,
            details
        } = req.body;

        const lesson = await lessonModel.getLessonById(id);

        if (id) {
            lesson.id = id;
        }
        if (user_teacher_id) {
            lesson.user_teacher_id = user_teacher_id;
        }
        if (id) {
            lesson.course_id = course_id;
        }
        if (lesson_name) {
            lesson.lesson_name = lesson_name;
        }
        if (lesson_order) {
            lesson.lesson_order = lesson_order;
        }
        if (task) {
            lesson.task = task;
        }
        if (details) {
            lesson.details = details;
        }

        const updateLesson = await lessonModel.updateLesson(lesson);

        res.status(200).json(updateLesson);

    } catch (error) {
        res.status(500).json({ error: 'Error updating lesson', details: error.message })
    }
};

const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLesson = await lessonModel.deleteCourse(id);
        res.status(200).json({ message: 'Lesson deleted successfully' }, deletedLesson);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lesson', details: error.message })
    }
}



module.exports = {
    createLesson,
    updateLesson,
    getLessons,
    getLessonById,
    deleteLesson
}