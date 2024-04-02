const getAllLessons = async (req, res) => {
    res.send('Retornando una lista de lecciones');
}

const getLesson = (req, res) => {
    res.send('Retornando una sola leccion');
}

const createLesson = (req, res) => {
    res.send('Creando una nueva leccion');
}

const deleteLesson = (req, res) => {
    res.send('Eliminando una leccion');
}

const updateLesson = (req, res) => {
    res.send('Actualizando una leccion');
}

module.exports = {
    getAllLessons,
    getLesson,
    createLesson,
    deleteLesson,
    updateLesson
}