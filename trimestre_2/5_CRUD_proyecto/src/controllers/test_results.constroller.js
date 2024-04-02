const getAllTestResult = async (req, res) => {
    res.send('Retornando una lista de Test Result');
}

const getTestResult = (req, res) => {
    res.send('Retornando un solo Test Result');
}

const createTestResult = (req, res) => {
    res.send('Creando un nuevo Test Result');
}

const deleteTestResult = (req, res) => {
    res.send('Eliminando un Test Result');
}

const updateTestResult = (req, res) => {
    res.send('Actualizando un Test Result');
}

module.exports = {
    getAllTestResult,
    getTestResult,
    createTestResult,
    deleteTestResult,
    updateTestResult
}