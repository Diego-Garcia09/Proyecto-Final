const proyectos = require('../servicios/proyectos');

const getAll = async function (req, res) {
    let p = await proyectos.findAll();
    await res.json(p);
    console.log(p);
};

const getByRFC = async function (req, res) {
    let p = await proyectos.findByRFC(1);
    await res.json(p);
    console.log(p);
}

const updateProyecto = async function (req, res) {
    try {
        const proyecto = req.body;
        let p = await proyectos.actualizaProyecto(req.params.id, proyecto);
        res.status(200).json(p);
    }
    catch (error) {
        return error;
    }
}

const createProyecto = async function (req, res) {
    const proyecto = req.body;
    console.log(proyecto);
    let p = await proyectos.crearProyecto(proyecto);
    res.status(201).json(p);
}

const deleteProyecto = async function (req, res) {
    let p = await proyectos.deleteById(req.params.id);
    await res.json(p);
    console.log(p);
}

exports.getAll = getAll;
exports.getByRFC = getByRFC;
exports.updateProyecto = updateProyecto;
exports.createProyecto = createProyecto;
exports.deleteProyecto = deleteProyecto;