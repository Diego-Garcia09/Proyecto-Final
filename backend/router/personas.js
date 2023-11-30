const express = require('express');
const router = express.Router();
const controladorPersonas = require('../controladores/controladorPersonas')
const passport = require('../passport');

// Permite o deniega el acceso a la ruta
const auth = passport.authenticate('jwt', { session: false });

router.get("/", auth, controladorPersonas.getAll);
router.get("/nombre/:nombre", controladorPersonas.getByNombre);
router.get("/nombre/:email/:rfc", controladorPersonas.getNombreByDatos);
router.get("/rfc/:rfc", controladorPersonas.getByRFC);
router.get("/email/:email", controladorPersonas.getByEmail);
router.get("/:id", controladorPersonas.getById);
router.get("/:nombre/:email/:rfc", controladorPersonas.getByPersona);
router.put("/:id", controladorPersonas.updatePersona);
router.delete("/:id", controladorPersonas.deletePersona);
router.post("/:nombre/:email/:rfc", controladorPersonas.crearPersona);

module.exports = router;