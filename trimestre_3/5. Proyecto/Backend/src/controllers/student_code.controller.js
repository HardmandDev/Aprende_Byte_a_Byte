const studentCodeModel = require('../models/studentCodeModel');

const createStudentCode = async (req, res) => {
    try {
        const {
            teacher_code_id,
            user_student_id,
            lesson_id,
            student_code
        } = req.body;

        const newStudentCode = await studentCodeModel.createStudentCode(
            {
                teacher_code_id,
                user_student_id,
                lesson_id,
                student_code
            }
        );
        res.status(201).json(newStudentCode);
    } catch (error) {
        res.status(500).json({ error: 'Error creating student code', details: error.message })
    }
}

const getAllStudentCode = async (req, res) => {
    try {
        const studentCode = await studentCodeModel.getAllStudentCode();
        res.status(200).json(studentCode);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student code' })
    }
}

const getStudentCodeById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentCode = await studentCodeModel.getStudentCodeById(id);

        if (studentCode) {
            res.status(200).json(studentCode);
        } else {
            res.status(404).json({ message: 'Student code not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student code' })
    }
}

const updateStudentCode = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            teacher_code_id,
            user_student_id,
            lesson_id,
            student_code
        } = req.body;

        const studentCode = await studentCodeModel.getStudentCodeById(id);

        if (teacher_code_id) {
            studentCode.teacher_code_id = teacher_code_id;
        }
        if (id) {
            studentCode.id = id;
        }
        if (user_student_id) {
            studentCode.user_student_id = user_student_id;
        }
        if (lesson_id) {
            studentCode.lesson_id = lesson_id;
        }
        if (student_code) {
            studentCode.student_code = student_code;
        }

        const updateStudentCode = await studentCodeModel.updateStudentCode(studentCode);

        res.status(200).json(updateStudentCode);

    } catch (error) {
        res.status(500).json({ error: 'Error updating student code', details: error.message })
    }
}

const deleteStudentCode = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudentCode = await studentCodeModel.deleteStudentCode(id);

        res.status(200).json(deletedStudentCode);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student code', details: error.message })
    }
}

module.exports = {
    createStudentCode,
    getAllStudentCode,
    getStudentCodeById,
    updateStudentCode,
    deleteStudentCode
}