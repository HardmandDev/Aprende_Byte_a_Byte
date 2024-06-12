const courseModel = require('../models/courseModel');

const approveCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.updateCourseStatus(id, 'approved');
        res.status(200).json({ message: 'Course approved successfully', course });
    } catch (error) {
        res.status(500).json({ error: 'Error approving course', details: error.message });
    }
};

const rejectCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.updateCourseStatus(id, 'rejected');
        res.status(200).json({ message: 'Course rejected successfully', course });
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting course', details: error.message });
    }
};

const pendingCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.updateCourseStatus(id, 'pending');
        res.status(200).json({ message: 'Course set to pending successfully', course });
    } catch (error) {
        res.status(500).json({ error: 'Error setting course to pending', details: error.message });
    }
};

module.exports = {
    approveCourse,
    rejectCourse,
    pendingCourse,
};