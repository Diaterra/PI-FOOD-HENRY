import React from "react";
import './Recipe.css';


const Recipe = ({name,image,health_score,diets})=>{
    return (
        <div className="recipe">
        <h2 className="name">{name}</h2>
        {image ? <img  className='img' src={image} alt=' '/>: <img className='img2' src='https://cdn6.aptoide.com/imgs/e/0/8/e08b4393fd23e8a9cdf0e71b96338d18_icon.png' alt='icon'/>}
        <h4 className="name_diets">{diets}</h4>
        <div className="div_health_score">
        <h2 className=".health_score">Health Score: {health_score}</h2>
        </div>
        </div>
    )
}

export default Recipe;