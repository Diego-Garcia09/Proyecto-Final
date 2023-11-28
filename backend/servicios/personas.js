const models = require('../models');

const findAll = async () => {
    personas = await models.Persona.findAll();
    return personas;
}

const findByRFC = async (id) => {
    personas = await models.Persona.findAll({
        where: {
            rfc: id
        }
    });
    return personas;
}

const findByEmail = async (correo) => {
    personas = await models.Persona.findAll({
        where: {
            email: correo
        }
    });
    return personas;
}

const findByPersona = async (name, correo, id) => {
    personas = await models.Persona.findAll({
        where: {
            nombre: name,
            email: correo,
            rfc: id
        }
    })
    return personas;
}

const createPersona = async (nuevaPersona) => {
    try {
        const persona = await models.Persona.create(nuevaPersona);
        await persona.save();
        return { success: true, persona };
    } catch (error) {
        return "Error al intentar crear persona";
    }
}

const actPersona = async (ide, personaActualizada) => {
    try {
        const persona = await models.Persona.findByPk(ide);
        if (!persona) {
            throw new Error('Persona no encontrada');
        }
        console.log(persona);
        persona.id = personaActualizada.id;
        persona.nombre = personaActualizada.nombre;
        persona.email = personaActualizada.email;
        persona.rfc = personaActualizada.rfc;
        console.log(persona);
        await persona.save();
        return { success: true, persona };
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return { success: false, message: 'No se pudo actualizar debido a datos duplicados' };
          }
          return { success: false, message: 'Error al actualizar la persona' };
    }
}

exports.findAll = findAll;
exports.findByRFC = findByRFC;
exports.findByPersona = findByPersona;
exports.createPersona = createPersona;
exports.findByEmail = findByEmail;
exports.actPersona = actPersona;