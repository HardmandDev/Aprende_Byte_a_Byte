const checkRole = (...roles) => {
    return (req, res, next) => {
        const roleMapping = {
            student: '8c890948-5402-40e6-a38d-6f2df9e3b4db',
            teacher: 'f3d9324c-ecbd-4d1b-bc92-dbe75ff149db',
            support: '6126917f-f7e3-4ee8-a5a1-16e3b128f26b',
            admin: '7bf4770d-ab11-4aba-9e0a-991b3f162488'
        };

        const allowedRoleIds = roles.map(role => roleMapping[role]);

        if (!allowedRoleIds.includes(req.user.role_id)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next();
    };
};

module.exports = { checkRole };
