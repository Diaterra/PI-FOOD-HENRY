const {Recipe} = require ('../db.js');
const {Diet} = require ('../db.js');
const {API_KEY, API_KEY2} = process.env;
const recipes_api = require('../utils/recipes_api');
const axios = require ('axios');


const getRecipesApi = async function (){
    try {
        //const totalrecipes =  recipes_api.results?.map((element)=>{  
        const resultsUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`);
        const totalrecipes = await resultsUrl.data.results?.map((element)=>{
           
         
             return {
             id: element.id,
             name: element.title,
             image: element.image,
             dish_summary: element.summary.replace( /(<([^>]+)>)/ig, ''),
             health_score: element.healthScore,
             instructions: element.analyzedInstructions[0]?.steps.map((element)=> element.step),
             diets: element.diets.map((element) => ({name:element})),
             dishTypes: element.dishTypes.map((element) => element),
                }});
             return totalrecipes;  
        
    } catch (error) {
        console.log(error) 
    }};



const getRecipesDb = async () => {
    try {
        const recipedb = await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        }) 
        return recipedb;
    } catch (error) {   
    } }

const getAllRecipes = async () => {
const api_recipes = await getRecipesApi();
const db_recipes = await getRecipesDb();
const allrecipes = api_recipes.concat(db_recipes);
    return allrecipes}



const newRecipes = async (name, dish_summary, health_score, instructions, diets, createdInDb) =>{
    try {
        const newRecipe = await Recipe.create({
            name,
            dish_summary,
            health_score,
            instructions,
            createdInDb,
             })
         if (diets) {
            const dietsDb = await Diet.findAll({
            where: {
                name:diets
            }})
            await newRecipe.addDiet(dietsDb);
        }
          return newRecipe;

    } catch (error) {
        console.log(error)
    }
 };
 

 const getRecipeById = async function(id){
  try {
   
    if  (id.toString().length < 8){
        
    const recipes_id = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`);
    const recipesById= recipes_id.data;
  
    const recipes = {
    name: recipesById.title,
    image: recipesById.image,
    dish_summary: recipesById.summary.replace( /(<([^>]+)>)/ig, ''),
    health_score: recipesById.healthScore,
    instructions: recipesById.analyzedInstructions[0]?.steps.map((element)=> element.step),
    diets: recipesById.diets.map((element) => ({name:element})),
    dishTypes: recipesById.dishTypes.map((element) => element),
   }   
    return recipes}
    
 else {
    
    const recipe = await Recipe.findByPk(id, {
    include: {
        model: Diet,
        attributes: ["name"],
        through: {
            attributes: []
        } 
    } 
 } ) 
 return recipe;      
  } 
}catch (error) {
    console.log(error)
  }
  
} 


module.exports = {getRecipesApi,
     getRecipesDb, 
     getAllRecipes, 
     newRecipes,
     getRecipeById,
     };


