import React from "react";
import { Link } from "react-router-dom";
import './Error_404.css'


const Error_404 = ()=>{
    return (
        <>
        <h1 className="text">Oops!!! Page not found</h1>
        <Link to='/home'>
        <button className="button">Go back Home</button>
        </Link>
        </>
    )
}

export default Error_404;