const {DataTypes, sequelize} = require('sequelize');
module.exports = (sequelize)=>{
    sequelize.define('diet',{
        id_diet:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
           /*  validate: {
                notEmpy: {msg: 'Diets is required'}
            } */
        }
    } , { timestamps: false })
}
