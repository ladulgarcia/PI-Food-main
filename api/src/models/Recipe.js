const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //----- Receta con las siguientes propiedades o ATRIBUTOS -----
  sequelize.define('recipe', {
    id: {
      // type: DataTypes.STRING,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: { // Nombre

    },
    summary: {// Resumen del plato

    },
    aggregateLikes: { // Puntuación

    },
    weightWatcherSmartPoints: {

    },
    healthScore: {// Nivel de "comida saludable"

    },
    sourceUrl: { // Paso a paso

    }

  });
};



