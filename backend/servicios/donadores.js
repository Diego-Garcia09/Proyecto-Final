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

const addDonacion = async (idProyecto, idPersona, cantidadDonacion) => {
    try {
        const proyecto = await models.Proyectos.findByPk(idProyecto);
        const persona = await models.Persona.findAll({
            where: {
                rfc: idPersona
            }
        });
        console.log(proyecto);
        console.log("Yo soy la persona", persona[0].id);
        console.log("Yo soy el ID que no debe salir NULL", persona[0].id);

        const donacion = await models.Donadores.create({
            personaId: persona[0].id,
            proyectoId: proyecto.id,
            donacion: cantidadDonacion // Asignar el valor de la donación aquí
        });
        await donacion.save();
        const cant = parseInt(cantidadDonacion) + proyecto.donacion;
        proyecto.donacion = cant;
        await proyecto.save();
        console.log(cant);
        // await proyecto.setDonacion(cantidadDonacion+proyecto.donacion);
        // await proyecto.addDonadores(donacion);
        return "Gracias por su donación";
    } catch (error) {
        return error;
    }
}

const actualizaDonacion = async (ide, donacion) => {
    try {
        console.log(ide);
        console.log(donacion);
        const persona = await models.Persona.findAll({
            where: {
                rfc: donacion.personaId
            }
        });
        const donation = await models.Donadores.findAll({
            where: {
                proyectoId: donacion.proyectoId,
                personaId: persona[0].id,
            }
        });
        donation[0].donacion = donation[0].donacion + parseInt(donacion.donacion);
        await donation[0].save();
        console.log(donation);
        return { success: true, message: "Donacion agregada." };
    } catch (error) {
        return { success: false, message: error };
    }

}

exports.findAll = findAll;
exports.addDonacion = addDonacion;
exports.findByPersonaId = findByPersonaId;
exports.findByProyectoId = findByProyectoId;
exports.actualizaDonacion = actualizaDonacion;