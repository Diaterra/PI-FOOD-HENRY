const { Router } = require('express');
const recipes = require('../middlewares/recipes');
const diets = require('../middlewares/diets');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes);
router.use('/diets', diets);

module.exports = router;
