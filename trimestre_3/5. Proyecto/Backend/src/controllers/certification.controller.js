const certificationModel = require('../models/certificationModel');

const createCertification = async (req, res) => {
    try {
        const {
            user_student_id,
            course_id
        } = req.body;

        const newCertification = await certificationModel.createCertification({
            user_student_id,
            course_id
        });

        res.status(201).json(newCertification);
    } catch (error) {
        res.status(500).json({ error: 'Error creating certification', details: error.message })
    }
}

const getCertificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const certification = await certificationModel.getCertificationById(id);

        if (certification) {
            res.status(200).json(certification);
        } else {
            res.status(404).json({ message: 'Test result not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching certification' })
    }
}

const updateCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            certificate_obtained,
            certification_url
        } = req.body;

        const certification = await certificationModel.getCertificationsById(id);

        if (id) {
            certification.id = id;
        }
        if (certificate_obtained) {
            certification.certificate_obtained = certificate_obtained;
        }

        const updateCertification = await certificationModel.updateCertification(certification);

        res.status(200).json(updateCertification);

    } catch (error) {
        res.status(500).json({ error: 'Error updating certification', details: error.message })
    }
}

module.exports = {
    createCertification,
    getCertificationById,
    updateCertification
}