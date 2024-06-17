const teacherCodeModel = require('../models/teacherCodeModel');

const createTeacherCode = async (req, res) => {
    try {
        const {
            user_teacher_id,
            lesson_id,
            teacher_code,
            test_code
        } = req.body;

        const newTeacherCode = await teacherCodeModel.createTeacherCode(
            {
                user_teacher_id,
                lesson_id,
                teacher_code,
                test_code
            }
        );
        res.status(201).json(newTeacherCode);
    } catch (error) {
        res.status(500).json({ error: 'Error creating teacher code', details: error.message })
    }
}

const getAllTeacherCode = async (req, res) => {
    try {
        const teacherCode = await teacherCodeModel.getAllTeacherCode();
        res.status(200).json(teacherCode);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teacher code' })
    }
}

const getTeacherCodeById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacherCode = await teacherCodeModel.getTeacherCodeById(id);

        if (teacherCode) {
            res.status(200).json(teacherCode);
        } else {
            res.status(404).json({ message: 'Teacher code not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teacher code' })
    }
}

const updateTeacherCode = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            user_teacher_id,
            lesson_id,
            teacher_code,
            test_code
        } = req.body;

        const teacherCode = await teacherCodeModel.getTeacherCodeById(id);

        if (id) {
            teacherCode.id = id;
        }
        if (user_teacher_id) {
            teacherCode.user_teacher_id = user_teacher_id;
        }
        if (lesson_id) {
            teacherCode.lesson_id = lesson_id;
        }
        if (teacher_code) {
            teacherCode.teacher_code = teacher_code;
        }
        if (test_code) {
            teacherCode.test_code = test_code;
        }

        const updateTeacherCode = await teacherCodeModel.updateTeacherCode(teacherCode);

        res.status(200).json(updateTeacherCode);

    } catch (error) {
        res.status(500).json({ error: 'Error updating teacher code', details: error.message })
    }
}

const deleteTeacherCode = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTeacherCode = await teacherCodeModel.deleteTeacherCode(id);

        res.status(200).json(deletedTeacherCode);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher code', details: error.message })
    }
}

module.exports = {
    createTeacherCode,
    getAllTeacherCode,
    getTeacherCodeById,
    updateTeacherCode,
    deleteTeacherCode
}