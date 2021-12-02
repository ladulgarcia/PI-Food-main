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
    const recipesInfo = await recipesUrl.data.map(e => {
        return {
            diets: e.diets,
            title: e.title,
            summary: e.summary,
            image: e.image,
            points: e.spoonacularScore,
            time: e.readyInMinutes,
            servings: e.servings,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions
        };
    });
    return recipesInfo; // La solicitud de info API-Recipes
};
// ------------------------ Traigo DB ---------------------------------------------------
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
const getAllRecipes = async () => {
    const recipeInfo = await getRecipesInfo(); // llamo a la API (y lo ejecuto)
    const dbInfo = await getDbInfo(); // lo mismo para DB
    const infoTotal = recipeInfo.concat(dbInfo); // concatena API con DB
    return infoTotal

}
module.exports = router;

