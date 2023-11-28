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
    let d = await donadores.addDonacion(req.params.idProyecto, req.params.idPersona);
    await res.json(d);
    console.log(d);
}

exports.getAll = getAll;
exports.createDonacion = createDonacion;
exports.getByPersonaId = getByPersonaId;
exports.getByProyectoId = getByProyectoId;