const getAllUsers = async (req, res) => {
    res.send('Retornando una lista de usuarios');
}
const getUserById = (req, res) => {
    res.send('Retornando un solo usuario');
}

const createUser = (req, res) => {
    res.send('Creando un nuevo usuario');
}

const deleteUserById = (req, res) => {
    res.send('Eliminando un usuario');
}

const updateUserById = (req, res) => {
    res.send('Actualizando un usuario');
}
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById
}