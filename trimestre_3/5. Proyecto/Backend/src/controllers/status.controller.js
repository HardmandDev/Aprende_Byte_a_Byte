const courseModel = require('../models/courseModel');
const lessonModel = require('../models/lessonModel');

const updateStatusCourse = async (req, res) => {
    try {
        const { course_id } = req.params;
        const { status, user_admin_id } = req.body

        const course = await courseModel.getCourseById(course_id);

        if (status) {
            course.status = status;
        }
        if (user_admin_id) {
            course.user_admin_id = user_admin_id;
        }

        const updatedCourse = await courseModel.updateStatusCourse(course_id, course);

        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(500).json({ error: 'Error updating course', details: error.message });
    }
};

const updateStatusLesson = async (req, res) => {
    try {
        const { lesson_id } = req.params;
        const { status, user_admin_id } = req.body

        const lesson = await lessonModel.getLessonById(lesson_id);

        if (status) {
            lesson.status = status;
        }
        if (user_admin_id) {
            lesson.user_admin_id = user_admin_id;
        }

        const updatedLesson = await lessonModel.updateStatusLesson(lesson_id, lesson);

        res.status(200).json(updatedLesson)
    } catch (error) {
        res.status(500).json({ error: 'Error updating lesson', details: error.message });
    }
};

module.exports = {
    updateStatusCourse,
    updateStatusLesson,
}