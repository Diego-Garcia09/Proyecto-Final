const personas = require('../servicios/personas');

const getAll = async function (req, res) {
    let p = await personas.findAll();
    await res.json(p);
    console.log(p);
};

const getByRFC = async function (req, res) {
    let p = await personas.findByRFC(req.params.rfc);
    await res.json(p);
    console.log(p);
}

const getByEmail = async function (req, res) {
    let p = await personas.findByEmail(req.params.email);
    await res.json(p);
    console.log(p);
}

const getByPersona = async function (req, res) {
    const nombre = req.params.nombre;
    const email = req.params.email;
    const rfc = req.params.rfc;
    let p = await personas.findByPersona(nombre, email, rfc);
    await res.json(p);
    console.log(p);
}

const crearPersona = async function (req, res) {
    const persona = {
        nombre: req.params.nombre,
        email: req.params.email,
        rfc: req.params.rfc
    };
    let p = await personas.createPersona(persona);
    res.status(201).json(p);
}

const updatePersona = async function (req, res) {
    try {
        const persona = req.body;
        let p = await personas.actPersona(req.params.id, persona);
        res.status(200).json(p);
    }
    catch (error) {
        return error;
    }
}

const getByNombre = async function(req, res) {
    let p = await personas.findByNombre(req.params.nombre);
    await res.json(p);
    console.log(p);
}

const getNombreByDatos = async function(req, res) {
    let p = await personas.findByDatos(req.params.email, req.params.rfc);
    await res.json(p);
    console.log(p);
}

const deletePersona = async function(req, res) {
    let p = await personas.deleteById(req.params.id);
    await res.json(p);
    console.log(p);
}

const getById = async function(req, res) {
    let p = await personas.findById(req.params.id);
    await res.json(p);
    console.log(p);
}

exports.getAll = getAll;
exports.getByRFC = getByRFC;
exports.getByEmail = getByEmail;
exports.getByNombre = getByNombre;
exports.getByPersona = getByPersona;
exports.deletePersona = deletePersona;
exports.crearPersona = crearPersona;
exports.updatePersona = updatePersona;
exports.getNombreByDatos = getNombreByDatos;
exports.getById = getById;