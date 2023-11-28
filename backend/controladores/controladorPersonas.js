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

exports.getAll = getAll;
exports.getByRFC = getByRFC;
exports.getByEmail = getByEmail;
exports.getByPersona = getByPersona;
exports.crearPersona = crearPersona;
exports.updatePersona = updatePersona;