import React from "react";
import { useDispatch } from "react-redux";
import {  useState } from "react";
import { getRecipe_Name } from "../../redux/actions";

import { useHistory } from "react-router-dom";


import "./SearchBar.css"

const SearchBar = ()=>{

const dispatch = useDispatch()
const [name, setName]= useState('')
const history= useHistory()


function handleChange(event) {
    setName(event.target.value);
  
    
  }

function handleSubmit(event) {
    event.preventDefault();
    dispatch(getRecipe_Name(name))
    history.push('/home')   
    

    setName('');
  }
    return (
        <div className="form-container">
         <input
                type="text"
                value={name}
                placeholder="Search Recipe..."
                className='input_search'
                onChange={(event) => handleChange(event)}
          ></input>
          <button
            type='submit'
            onClick={event=>handleSubmit(event)}
            className='label'
          >Find Recipe</button>
        
        </div>
        
    )
}
  
export default SearchBar;  
  
   
          
                  
          
  
  
 
