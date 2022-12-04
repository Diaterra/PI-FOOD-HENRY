import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDiets, postRecipe } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import './CreateRecipe.css';




const CreateRecipe = () => {
    const dispatch = useDispatch();
    const diets = useSelector((state)=>state.diets);
    const history = useHistory()
    
  

    
    const validate=(input)=>{
      let errors={};
      
   if(!input.name){
      errors.name='Name is required'
   } else if(input.name.length >100 || input.name.length < 3) {
      errors.name = 'The name is too long or too short'
   } else if(!(/^[A-Za-z0-9\s]+$/g.test(input.name))){
     errors.name = 'Can not write that character'
   } 
   
     
   if(!input.dish_summary || input.dish_summary.length < 10 ){
      errors.dish_summary='Dish_summary is required'
   } 
   
   if (input.health_score < 0 || input.health_score > 100){
      errors.health_score = 'Health score is out to range (0-100)'
   }  else if (isNaN(input.health_score)) {
      errors.health_score = 'Health score must to be a number' 
   } else if(!/^\d+$/.test(input.health_score))
   errors.health_score = 'Must to be a Integer'


   if (input.diets.length<1){
      errors.diets = 'A diet is required'
   }
  return errors}



    const [input,setInput]=useState({
       name: '',
       dish_summary: '',
       health_score: 0,
       instructions: '',
       diets:[]
    })
    useEffect(()=>{dispatch(getDiets())}, [dispatch])
   
    function handleChangeInput(event){
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
         SetErrors(validate({
            ...input,
            [event.target.name] : event.target.value}))
    }


    function handleSelectDiets(event){
     if(!input.diets.includes(event.target.value)){
           setInput({
            ...input,
            diets:[...input.diets, event.target.value]
        })}
        SetErrors(validate({
         ...input,
         [event.target.name] : event.target.value}))
            
      }


   function handleSubmit(event){
        event.preventDefault()
        const getError = validate(input);
        if(Object.values(getError).length !== 0){
        alert('This action does not complete, check the fields')
        } else { dispatch(postRecipe(input))
           
        alert('Recipe created')
        setInput({     
        name: '',
        dish_summary: '',
        health_score: 0,
        instructions: '',
        diets:[]});
        history.push('/home')                
    }}
    

 const [errors, SetErrors]= useState({
    name:'',
    dish_summary: '',
    health_score: 0,
    instructions: '',
    diets: [],
}) 
    return(
        <> 
        <NavBar/>  
        <div className="background-create">
        <h1 className="title_create">Create Recipe</h1>
        <div>

        <form className="form" onSubmit={event=>handleSubmit(event)}>

            <label className="form_label">Name*:</label>
            <input 
            type= 'text' 
            name= 'name'
            value={input.name} 
            onChange={event=>handleChangeInput(event)}
            placeholder='Name'
            className='form_input'
            required/>
            {errors.name && <p className='form_error'>{errors.name}</p>}             
            
            <label className="form_label">Dis_summary*:</label>
            <textarea  
            type='text'
            name= 'dish_summary' 
            value={input.dish_summary} 
            onChange={event=>handleChangeInput(event)}
            placeholder='Dish_summary'
            className='form_input'
            required/>
            {errors.dish_summary && <p className='form_error'>{errors.dish_summary}</p>} 
            
            <label className="form_label">Health_score:</label>
            <input required
            type="number" 
            name= 'health_score' 
            value={input.health_score} 
            onChange={event=>handleChangeInput(event)}
            className= 'form_input'/>
            {errors.health_score && <p className='form_error'>{errors.health_score}</p>}    
            
           
            <label className="form_label">Instructions</label>
            <textarea required
            className="div_textarea" 
            type='text' 
            name='instructions' 
            value={input.instructions} 
            placeholder='Instructions'
            onChange={event=>handleChangeInput(event)} />
                
            
             <label className="form_label">Diets</label>
             <div  required>
             {diets?.map((element)=> 
             <div key={element}>
             <input  type='checkbox' name= 'diets' value={element} onChange={event=>handleSelectDiets(event)}/>
             <label>{element}</label>
             </div>)}
             {errors.diets && <p className='form_error'>{errors.diets}</p>}         
             </div>

          
            <button className="button" type='submit' disabled={Object.keys(errors).length}>Create Recipe</button>
            <div>
            </div>       
            
        </form>
        </div>
        </div>
             </>
    )
            }
export default CreateRecipe;
