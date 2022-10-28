import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState } from "react";
import {getRecipes,filterCreated,getDiets, filterTypeOfDiet, orderRecipesName,orderRecipesHealthSc} from "../../redux/actions";
import Recipe from "../Recipe/Recipe";
import {Link} from 'react-router-dom';
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import "./Home.css";


const Home = () =>{

const dispatch = useDispatch();
const recipes = useSelector((state)=>state.recipes); 
const diets = useSelector((state)=>state.diets);
const [order, SetOrder]= useState(' ')


const recipesxPage = useSelector ((state)=>state.recipesxPage)
const actualPage = useSelector((state)=>state.actualPage)
const positionOfLastRecipe = actualPage * recipesxPage; 
const positionOfFirstRecipe = positionOfLastRecipe - recipesxPage; 
const actualRecipes = recipes.slice(positionOfFirstRecipe,positionOfLastRecipe) 


useEffect(()=>{
    dispatch(getRecipes());dispatch(getDiets())
},[dispatch]) 


function recipesRefresh (){
      dispatch(getRecipes());dispatch(getDiets())
}

function handleFilterCreated(event){
    dispatch((filterCreated(event.target.value)))  
}


function handleFilterDiets(event){
    dispatch(filterTypeOfDiet(event.target.value))   
}

function handleSortName (event){
    dispatch(orderRecipesName(event.target.value));
    order ?  SetOrder(false) : SetOrder(`Ordenado ${event.target.value}`)
} 

function handleSortHealth(event){
    dispatch(orderRecipesHealthSc(event.target.value));
    order ? SetOrder(false) : SetOrder(`Ordenado ${event.target.value}`)
}
           
    return (
        <div className="background-home">
        
        <NavBar/>  
        
        {recipes.length === 0 && <Loading/>} 


        <div >
            <h1 className="title-recipe">The only food App you'll ever need to cook.</h1>
           

            <div>
            <p className="title-fil-ord">Order and Filter the recipes</p>
            </div>
           

        <div className="filter-order">
       
      
        <div className="order">
        <div>
           <button className="button" value= 'asc' onClick={event=>handleSortName(event)}>A-z</button>
           <button className="button"  value= 'desc' onClick={event=>handleSortName(event)}>Z-a</button>
          </div>
        </div>
      
        <div className="order"> 
           <button className="button" value= 'asc health' onClick={event=>handleSortHealth(event)}>Health ↑</button>
           <button className="button" value= 'desc health' onClick={event=>handleSortHealth(event)}>Health ↓</button> 
        </div> 
      
        <div className="order">        
           <button className="button" value= 'created' onClick = {event=>handleFilterCreated(event)}>My recipes</button> 
        </div>

        <div className="content-select">
            
        <select defaultValue='Diets'onChange={event=>handleFilterDiets(event)}>
           <option disabled='Diets' name='Diets' value='Diets'>Diets</option>
           
           {diets?.map((element)=> <option  name={element} key={element} value={element}>{element}</option>)}
         </select>  
          
         </div>  
         
         </div>

         <div className="div-refresh">
         
            <button className="refresh" onClick={event=>recipesRefresh(event)}>Refresh</button>
        
         </div>
        
         <div className="recipes_container">

            {actualRecipes?.map((element)=>{ return (  
              
            
                 
             <Link to={'/recipes/' + element.id} className="link" key={element.id}>
             <Recipe  
                    name={element.name}
                    image={element.image}
                    health_score= {element.health_score} 
                    diets={element.diets.map(e =>e.name).join('   /   ')} 
             />
             </Link>        
             
            )
       })
         }  
          </div>
          <div>
         <Pagination
         /*   recipesxPage = {recipesxPage} 
           recipes = {recipes.length} */
           /* = {pagination} */
            />
            </div>
         
        
        </div> 
       
       


     </div>

    )
    
    
   
}

export default Home;