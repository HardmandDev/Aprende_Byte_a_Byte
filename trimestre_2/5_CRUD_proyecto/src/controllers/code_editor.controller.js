const getAllCodeEditor = async (req, res) => {
    res.send('Retornando una lista de Editores de Codigo');
}

const getCodeEditor = (req, res) => {
    res.send('Retornando un solo Editor de Codigo');
}

const createCodeEditor = (req, res) => {
    res.send('Creando un nuevo Editor de Codigo');
}

const deleteCodeEditor = (req, res) => {
    res.send('Eliminando un Editor de Codigo');
}

const updateCodeEditor = (req, res) => {
    res.send('Actualizando un Editor de Codigo');
}

module.exports = {
    getAllCodeEditor,
    getCodeEditor,
    createCodeEditor,
    deleteCodeEditor,
    updateCodeEditor
}