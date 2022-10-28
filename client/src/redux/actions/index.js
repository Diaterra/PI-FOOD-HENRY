
import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';
export const GET_RECIPE_ID = 'GET_RECIPE_ID';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const CREATE_RECIPE = 'CREATE RECIPE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_TYPE_OF_DIET = 'FILTER_TYPE_OF_DIET';
export const GET_DIETS ='GET_DIETS';
export const ORDER_RECIPES_NAME = 'ORDER_RECIPES_NAME';
export const ORDER_RECIPES_HEALTH_SC = 'ORDER_RECIPES_HEALTH_SC';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const CHANGE_PAGE = 'CHANGE_PAGE';


export const getRecipes = () => {
    return async function (dispatch){
        await fetch(`http://localhost:3001/recipes`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_RECIPES, payload: data}))
         }
} 

export const getRecipe_Name =(name)=>{
    return async function(dispatch){
        console.log(name)
    try {
          await fetch(`http://localhost:3001/recipes?name=${name}`)
             .then(response=>response.json())
             .then(data =>dispatch({type:GET_RECIPE_NAME, payload: data}))
        
    } catch (error) {
        alert('Not found recipe with this name')
        console.log(error)
    }
}
}



export const getRecipe_Id = (id)=> {
    try {
          return async function(dispatch){
         await axios.get(`http://localhost:3001/recipes/${id}`)
          .then(response => {
            dispatch({
                type: GET_RECIPE_ID,
                payload: response.data
            })
          })} 
    }
    catch(error){
        console.log(error)
    }}
   



export const getDiets = ()=>{
    return async function (dispatch){
     await fetch(`http://localhost:3001/diets`)
        .then(response=>response.json())
        .then(data=>dispatch({type: GET_DIETS, payload:data}))
    }
}


export const postRecipe = (payload)=> {
    return async function (dispatch){
    let json = await axios.post(`http://localhost:3001/recipes`, payload)
    return {
        type: CREATE_RECIPE,
        json,
    }
    }}

    
export const filterCreated = (payload) =>{ 
    return {
        type : FILTER_CREATED,
        payload,
    }
}

export const filterTypeOfDiet = (payload)=>{
    return {
        type: FILTER_TYPE_OF_DIET,
        payload,
    }
}

export const orderRecipesName = (payload)=>{
    return{
        type: ORDER_RECIPES_NAME,
        payload,
    }
}

export const orderRecipesHealthSc = (payload)=>{
    return{
        type: ORDER_RECIPES_HEALTH_SC,
        payload,
    }
}
export const changePage = (payload)=>{
    return{
        type: CHANGE_PAGE,
        payload,
    }
}

export const cleanDetail = ()=>{
    return{
        type: CLEAN_DETAIL,
    }
}



