const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate:{
        isUUID:4,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
       validate: {
        notEmpty: {msg: 'Name is required'}
      } 
    },
    dish_summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Dish_summary is required'},
      }
    },
    health_score: {
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: {msg: "Must be a number"},
        min: 0,
        max:100,
         }
       
      },
    instructions:{
      type: DataTypes.STRING,
    },
    createdInDb: {  
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    },    
  }, { timestamps: false });
};
