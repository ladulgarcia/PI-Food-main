const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env


//const { Sequelize } = require("sequelize");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// ------------------------ Traigo info API ---------------------------------------------------
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.map(el => {
        return {//elementos de la api que le requiero:
            id: el.id,
            name: el.title,
            diet: el.diets.map(el => el.title), // (el => el)
            summary: el.summary,
            image: el.image,
            score: el.spoonacularScore,
            time: el.readyInMinutes,
            servings: el.servings,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions
        };
    });
    return apiInfo; // La solicitud de info API-Recipes que solicito
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
    const apiInfo = await getApiInfo(); // llamo a la API (y lo ejecuto)
    const dbInfo = await getDbInfo(); // lo mismo para DB
    const infoTotal = apiInfo.concat(dbInfo); // concatena API con DB 
    return infoTotal // devuelve el arreglo llamado infoTotal
}
// ------------------------ Ruta GET RECIPIES query -----------------------------------------------------
router.get('/recipes/', async (req, res) => {
    const name = req.query.name
    let recipesTotal = await getAllRecipes();
    if (name) { // si hay un nombre que me pasan por query entonces:
        let recipeName = await recipesTotal.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
        recipeName.length ? // Encontraste algo??
            res.status(200).send(recipeName) :
            res.status(404).send('No está la receta que buscas');
    } else {
        res.status(200).send(recipesTotal)
    }
})
// HASTA AQUÍ CORRE LOCHALHOST3001 PERO NO CORRE LA RUTA EN POSTMAN

module.exports = router;

