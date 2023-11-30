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

const findByDatos = async (correo, ide) => {
    personas = await models.Persona.findAll({
        where: {
            email: correo,
            rfc: ide
        }
    });
    return personas;
}

const findById = async (ide) => {
    personas = await models.Persona.findAll({
        where: {
            id: ide,
        }
    });
    return personas;
}

const findByNombre = async (name) => {
    personas = await models.Persona.findAll({
        where: {
            nombre: name
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

const deleteById = async (ide) => {
    try{
        const per = await models.Donadores.findAll({
            where: {
                personaId: ide
            }
        });
        const proy = await models.Proyectos.findAll({
            where: {
                id: per[0].proyectoId
            }
        });
        const cant = proy[0].donacion - per[0].donacion;
        console.log(cant);
        proy[0].donacion = cant;
        await proy[0].save();
        const proyecto = await models.Donadores.destroy({
            where: {
                personaId: ide
            }
        });
        const persona = await models.Persona.destroy({
            where: {
                id: ide
            }
        });
        return { success: true, persona, proyecto };
    }catch(error){return { success: false, message: error };}
    
}

exports.findAll = findAll;
exports.findByRFC = findByRFC;
exports.findById = findById;
exports.findByNombre = findByNombre;
exports.findByPersona = findByPersona;
exports.findByDatos = findByDatos;
exports.createPersona = createPersona;
exports.findByEmail = findByEmail;
exports.actPersona = actPersona;
exports.deleteById = deleteById;