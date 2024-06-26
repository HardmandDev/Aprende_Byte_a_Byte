const studentProgressModel = require('../models/studentProgressModel');

const createStudentProgress = async (req, res) => {
    try {
        const {
            user_student_id,
            course_id,
            lesson_id
        } = req.params;

        const newStudentProgress = await studentProgressModel.createStudentProgress({
            user_student_id,
            course_id,
            lesson_id
        });

        res.status(201).json(newStudentProgress);
    } catch (error) {
        res.status(500).json({ error: 'Error creating student progress', details: error.message })
    }
}

const getAllStudentProgress = async (req, res) => {
    try {
        const studentProgress = await studentProgressModel.getAllStudentProgress();
        res.status(200).json(studentProgress);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student progress' })
    }
}

const getStudentProgressById = async (req, res) => {
    try {
        const { user_student_id } = req.params;
        const studentProgress = await studentProgressModel.getStudentProgressById(user_student_id);

        if (studentProgress) {
            res.status(200).json(studentProgress);
        } else {
            res.status(404).json({ message: 'Student progress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student progress' })
    }
}

const updateStudentProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            lesson_approved
        } = req.body;

        const studentProgress = await studentProgressModel.getStudentProgressById(id);

        if (id) {
            studentProgress.id = id;
        }
        if (lesson_approved) {
            studentProgress.lesson_approved = lesson_approved;
        }

        const updateStudentProgress = await studentProgressModel.updateStudentProgress(studentProgress);

        res.status(200).json(updateStudentProgress);

    } catch (error) {
        res.status(500).json({ error: 'Error updating student progress', details: error.message })
    }
}

const deleteStudentProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudentProgress = await studentProgressModel.deleteStudentProgress(id);

        res.status(200).json(deletedStudentProgress);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student progress', details: error.message })
    }
}

module.exports = {
    createStudentProgress,
    getAllStudentProgress,
    getStudentProgressById,
    updateStudentProgress,
    deleteStudentProgress
}