const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// ------------------------ Traigo info API ---------------------------------------------------
const getRecipesInfo = async () => {
    const recipesUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch');
    const recipesInfo = await recipesUrl.data.map(el => {
        return {
            diets: el.diets,
            title: el.title,
            summary: el.summary,
            image: el.image,
            points: el.spoonacularScore,
            time: el.readyInMinutes,
            servings: el.servings,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions
        };
    });
    return recipesInfo; // La solicitud de info API-Recipes
};
// ------------------------ Traigo BD ---------------------------------------------------
const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    })
}
// ------------------------ Concatenación -----------------------------------------------



module.exports = router;

