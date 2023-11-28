const models = require('../models');

const findAll = async () => {
    donadores = await models.Donadores.findAll();
    return donadores;
}

const findByPersonaId = async (ide) => {
    donadores = await models.Donadores.findAll({
        where: {
            personaId: ide
        }
    });
    return donadores;
}

const findByProyectoId = async (ide) => {
    donadores = await models.Donadores.findAll({
        where: {
            proyectoId: ide
        }
    });
    return donadores;
}

const addDonacion = async (idProyecto, idPersona) => {
    try {
        const proyecto = await models.Proyectos.findByPk(idProyecto);
        const persona = await models.Persona.findAll({
            where: {
                rfc: idPersona
            }
        });
        console.log(proyecto);
        console.log(persona);
        await proyecto.addDonadores(persona);
        return "Gracias por su donación";
    } catch (error) {
        return error;
    }
}

exports.findAll = findAll;
exports.addDonacion = addDonacion;
exports.findByPersonaId = findByPersonaId;
exports.findByProyectoId = findByProyectoId;