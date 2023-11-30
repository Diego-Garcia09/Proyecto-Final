const express = require('express');
const router = express.Router();
const controladorProyecto = require('../controladores/controladorProyectos')
const passport = require('../passport');

// Permite o deniega el acceso a la ruta
const auth = passport.authenticate('jwt', { session: false });

router.get("/", auth, controladorProyecto.getAll);
router.get("/:id", controladorProyecto.getByRFC);
router.put("/:id", controladorProyecto.updateProyecto);
router.post("/", controladorProyecto.createProyecto);
router.delete("/:id", controladorProyecto.deleteProyecto);

module.exports = router;