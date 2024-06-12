const courseModel = require('../models/courseModel')

const createCourse = async (req, res) => {
    try {
        const { user_id, course_name, description, image_url, level_id } = req.body;

        const newCourse = await courseModel.createCourse(
            { course_name, description, image_url, level_id },
            user_id
        );

        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: 'Error creating course', details: error.message });
    }
}

module.exports = {
    createCourse
}