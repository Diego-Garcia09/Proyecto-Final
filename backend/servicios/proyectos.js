const models = require('../models');

const findAll = async () => {
    proyectos = await models.Proyectos.findAll();
    return proyectos;
}

const findByRFC = async (rfc) => {
    proyectos = await models.Proyectos.findAll({
        where: {
            id: rfc
        }
    });
    return proyectos;
}

const actualizaProyecto = async (ide, proyectoActualizado) => {
    try {
        const proyecto = await models.Proyectos.findByPk(ide);
        if (!proyecto) {
            throw new Error('Proyecto no encontrado');
        }
        console.log(proyecto);
        proyecto.id = proyectoActualizado.id;
        proyecto.nombre = proyectoActualizado.nombre;
        proyecto.descripcion = proyectoActualizado.descripcion;
        proyecto.donatarioId = proyectoActualizado.donatarioId;
        console.log(proyecto);
        await proyecto.save();
        return { success: true, proyecto };
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return { success: false, message: 'No se pudo actualizar debido a datos duplicados' };
        }
        return { success: false, message: 'Error al actualizar proyecto' };
    }
}

const crearProyecto = async (nuevoProyecto) => {
    try {
        const proyecto = await models.Proyectos.create(nuevoProyecto);
        await proyecto.save();
        return { success: true, proyecto };
    } catch (error) {
        return "Error al intentar crear proyecto", error;
    }
}

const deleteById = async (ide) => {
    try {
        // Conseguir proyecto a donar
        const proyecto = await models.Proyectos.findByPk(ide);
        console.log(proyecto);
        // Borrar donaciones
        const donadores = await models.Donadores.destroy({
            where: {
                proyectoId: proyecto.id
            }
        });
        console.log(donadores);
        await proyecto.destroy();
        // await models.Proyectos.destroy(proyecto);
        return { success: true, message: "Proyecto eliminado" };
    } catch (error) {
        return { success: false, message: error };
    }
}

exports.findAll = findAll;
exports.findByRFC = findByRFC;
exports.actualizaProyecto = actualizaProyecto;
exports.crearProyecto = crearProyecto;
exports.deleteById = deleteById;