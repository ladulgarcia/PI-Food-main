const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  //----- Receta con las siguientes propiedades o ATRIBUTOS -----

  sequelize.define('recipe', {
    id: { // ID*
      // type: DataTypes.STRING,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { // Nombre*
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: { // Resumen del plato*
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: { // imagen
      type: DataTypes.TEXT,
      allowNull: true,
    },
    spoonacularScore: { // Puntuación
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    readyInMinutes: { // Tiempo de preparación
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    servings: { // Porciones
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore: { // Nivel de "comida saludable"
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    analyzedInstructions: { // Paso a paso
      type: DataTypes.TEXT,
      allowNull: true
    }
    //--------- * obligatorios PI --------------------------
  });

};

