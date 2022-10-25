const {Diet} = require ('../db');
const diets = require ('../utils/diets_api');
const {API_KEY, API_KEY2} = process.env;
const axios = require('axios');
const diets_api = require('../utils/diets_api');
const recipes_api = require('../utils/recipes_api');
 const getAlldiets = async function (){
  try {
  
  //voy a agregar la ruta de la base de datos para no consumir peticiones a la api
  //ESTA ES A LA BASE DE DATOS LA CONSULTA const allRecipes = await axios.get(`http://localhost:3001/diets`);
//   const takediets = diets_api?.map((element)=>element.diets.name); // ESTA ES LA CONSULTA AL ARCHIVO
  
  const takediets =  recipes_api.results?.map((element)=>element.diets);  
  /* const allRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const takediets = allRecipes.data.results?.map((element)=>element.diets); */
  
  const diets2=[]
  takediets.forEach((element)=>{
    for (let i= 0; i < element.length; i++) {
            diets2.push(element[i]);
  }})
   
    diets2.forEach(element => {
        if (element) {
            Diet.findOrCreate({
                where: { name: element }
            })
        }
    });
    const getDiets = await Diet.findAll();
    
    return getDiets;
  } catch (error) {
        
  } 
  
  
 }
    module.exports= {getAlldiets}
/* const getAlldiets = async function (){
    diets.forEach(element => {
       Diet.findOrCreate({
        where:{
            name: element
        }
       })
    });
    const getDiets = await Diet.findAll();
    
    return getDiets;
   
}; */

