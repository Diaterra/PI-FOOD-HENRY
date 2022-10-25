import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions";
import './Pagination.css'


const Pagination = ()=>{ //estas props vienen del estado global constante y useSelector, y traer tambien currenta page para el next, pagination lo cambio con por la accion change page
    //me traigo por props todas las recetas, el estado que me renderiza cuantas recetas quiero por pag (recipesxPage), todas las recetas y la constante pagination
    const dispatch = useDispatch();
    const recipesxPage = useSelector ((state)=>state.recipesxPage)
    const recipes = useSelector((state)=>state.recipes)
    const actualPage = useSelector((state)=>state.actualPage)

    const numberPages = [];
    console.log(numberPages)
    const allrecipes = recipes.length;
    for(let i= 1; i<=Math.ceil(allrecipes/recipesxPage); i++){ 
        // ver divido todas las recetas  por la catidad de recetas por paginas, entonces cuando estoy en home, renderizo y le paso por props al componente Pagination los parametros
     numberPages.push(i)}


console.log(numberPages)    
    function handleChangePage (event) {
        dispatch(changePage(event.target.value))
    }    
console.log(actualPage)

    return (
        <div>
        <nav>
        
        {numberPages && actualPage > 1 ? <button className="button_pagi" value='Prev' onClick={event=>handleChangePage(event)}>Prev</button> : null}
        
        {numberPages?.map((number)=>(
            <button className={actualPage=== number ? "button_current" : "button_pagi"} key={number} value={number} onClick= {event=>handleChangePage(event)}>{number}</button>))}

        {numberPages && actualPage < numberPages.length ? <button className="button_pagi" value='Next' onClick={event=>handleChangePage(event)}>Next</button> : null}
         
        
        </nav>
        </div>
        )}

//el Math.ceil redondea a un numero entero la cantidad de recetas que quiero por paginas, este componente renderiza el numerito en si

export default Pagination;