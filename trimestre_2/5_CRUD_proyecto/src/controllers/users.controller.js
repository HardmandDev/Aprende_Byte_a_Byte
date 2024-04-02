const getAllUsers = async (req, res) => {
    res.send('Retornando una lista de usuarios');
}

const getUser = (req, res) => {
    res.send('Retornando un solo usuario');
}

const createUser = (req, res) => {
    res.send('Creando un nuevo usuario');
}

const deleteUser = (req, res) => {
    res.send('Eliminando un usuario');
}

const updateUser = (req, res) => {
    res.send('Actualizando un usuario');
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}