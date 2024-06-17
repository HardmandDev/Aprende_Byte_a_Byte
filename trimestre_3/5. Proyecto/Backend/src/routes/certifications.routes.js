const { Router } = require('express');
const router = Router();

const {
    createCertification,
    getCertificationById,
    updateCertification
} = require('../controllers/certification.controller')

const { authenticateToken } = require('../middlewares/authenticateToken')
const { checkRole } = require('../middlewares/checkRole');

router.use(authenticateToken);

// router.get('/', checkRole('teacher', 'admin'), getAllCertifications)

router.get('/:id', checkRole('teacher', 'admin', 'student'), getCertificationById)

router.post('/', checkRole('teacher', 'admin', 'student'), createCertification)

router.put('/:id', checkRole('teacher', 'admin', 'student'), updateCertification)

// router.delete('/:id', checkRole('teacher', 'admin'), deleteCertification)

module.exports = router;
