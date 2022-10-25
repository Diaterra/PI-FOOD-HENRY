import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css"


const NavBar = ()=>{
    return (
        <nav className="navbar">
            
            <div className="list-item">
            <Link to='/Home'>Home</Link>

            <Link to='/createRecipe'>Create Recipe</Link>
            </div>
            <div>
            <SearchBar/>    
            </div>  
            
            
        </nav>
    )
}

export default NavBar;