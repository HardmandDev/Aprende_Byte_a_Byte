const getAllCourses = async (req, res) => {
    res.send('Retornando lista de cursos')
}

const getCourse = (req, res) => {
    res.send('Retornando un curso')
}

const createCourse = (req, res) => {
    res.send('Creando un curso')
}

const deleteCourse = (req, res) => {
    res.send('Eliminando un curso')
}

const updateCourse = (req, res) => {
    res.send('Actualizando un curso')
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
}