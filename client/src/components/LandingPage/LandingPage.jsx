import React from "react";
import {Link} from 'react-router-dom';



import './LandingPage.css';



const LandingPage = ()=>{
    return(
        
      
            <div className="background">
            
         <h1 className="title">LET'S GO TO</h1>
         <Link to ='/home'>
         <div className=".button">
            <button className="buttonGo">COOK</button></div>
            
         </Link>   
        
        </div>
      
    )
}

export default LandingPage;