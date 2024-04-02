// No creo que sea util usar todos estos metodos para esta tabla

const getAllStudentProgress = async (req, res) => {
    res.send('Retornando una lista de progresos de estudiante');
}

const getStudentProgress = (req, res) => {
    res.send('Retornando un solo progreso de estudiante');
}

const createStudentProgress = (req, res) => {
    res.send('Creando un nuevo progreso de estudiante');
}

const deleteStudentProgress = (req, res) => {
    res.send('Eliminando un progreso de estudiante');
}

const updateStudentProgress = (req, res) => {
    res.send('Actualizando un progreso de estudiante');
}

module.exports = {
    getAllStudentProgress,
    getStudentProgress,
    createStudentProgress,
    deleteStudentProgress,
    updateStudentProgress
}