const {Diet} = require ('../db');
const {API_KEY, API_KEY2} = process.env;
const axios = require('axios');
const recipes_api = require('../utils/recipes_api');



const getAlldiets = async function (){
  
  try {
  //const takediets =  recipes_api.results?.map((element)=>element.diets);  
  const allRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`);
  const takediets = allRecipes.data.results?.map((element)=>element.diets); 
  
  const diets2=[]
  takediets.forEach((element)=>{
    for (let i= 0; i < element.length; i++) {
            diets2.push(element[i]);
  }})
   
   const diets3 = [...new Set(diets2)]
    diets3.forEach(element => {
        if (element) {
            Diet.findOrCreate({
                where: { name: element }
            })
        }
    });     
    return diets3;

  } catch (error) {
    console.log(error)
  }
 }
    module.exports= {getAlldiets}

