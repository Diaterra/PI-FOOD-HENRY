import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions";
import './Pagination.css'


const Pagination = ()=>{ 
    const dispatch = useDispatch();
    const recipesxPage = useSelector ((state)=>state.recipesxPage)
    const recipes = useSelector((state)=>state.recipes)
    const actualPage = useSelector((state)=>state.actualPage)

    const numberPages = [];
   
    const allrecipes = recipes.length;
    for(let i= 1; i<=Math.ceil(allrecipes/recipesxPage); i++){ 
     numberPages.push(i)}



    function handleChangePage (event) {
        dispatch(changePage(event.target.value))
    }    


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

 
export default Pagination;