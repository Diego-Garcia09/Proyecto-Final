const donadores = require('../servicios/donadores');

const getAll = async function(req, res) {
    let d = await donadores.findAll();
    await res.json(d);
    console.log(d);
};

const getByPersonaId = async function(req, res) {
    let d = await donadores.findByPersonaId(req.params.id);
    await res.json(d);
    console.log(d);
}

const getByProyectoId = async function(req, res) {
    let d = await donadores.findByProyectoId(req.params.id);
    await res.json(d);
    console.log(d);
}

const createDonacion = async function(req, res) {
    let d = await donadores.addDonacion(req.body.proyectoId, req.body.personaId, req.body.donacion);
    await res.json(d);
    console.log(d);
}

const updateDonacion = async function(req, res) {
    try {
        const donacion = req.body;
        let d = await donadores.actualizaDonacion(req.params.proyectoId, donacion);
        res.status(200).json(d);
    }
    catch (error) {
        return error;
    }
}

exports.getAll = getAll;
exports.createDonacion = createDonacion;
exports.getByPersonaId = getByPersonaId;
exports.getByProyectoId = getByProyectoId;
exports.updateDonacion = updateDonacion;