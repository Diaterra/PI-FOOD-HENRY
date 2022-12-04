import { FILTER_CREATED, FILTER_TYPE_OF_DIET, GET_RECIPES, ORDER_RECIPES_NAME, ORDER_RECIPES_HEALTH_SC,GET_RECIPE_ID, GET_RECIPE_NAME,CREATE_RECIPE,GET_DIETS, CLEAN_DETAIL, CHANGE_PAGE} from "../actions";


const initialState = {
    recipes: [],
    allRecipes:[],
    diets:[],
    alldiets:[],
    recipeDetail:{},  
    recipesByName:[],
    recipesxPage: 9,
    actualPage:1,
  
    
}

const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_RECIPES:         
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                
            };

        case GET_RECIPE_ID:{
            return{
                ...state,
                recipeDetail: action.payload,
        }};

        case GET_RECIPE_NAME:{
            return{
                ...state,
                recipes: action.payload,
                actualPage:1
            }
                    };
        case FILTER_CREATED:
            const recipesCreated = state.allRecipes


            const createdFiltered = action.payload === 'created' ? recipesCreated.filter((elem)=>elem.createdInDb) : recipesCreated.filter((elem)=>!elem.createdInDb)
            return {
                ...state, 
                recipes: action.payload === 'created' ? createdFiltered : recipesCreated,
                actualPage: 1
            };
        case FILTER_TYPE_OF_DIET:
            const allRecipes = state.recipes
           
            const recipes_filter_diet = allRecipes.filter((element)=>{
                let recipe = element.diets.map(e =>e.name)
                if (recipe.includes(action.payload)){return element}
            } )
                    
            return{
                ...state,
                recipes: action.payload === 'All' ? allRecipes : recipes_filter_diet,
                actualPage:1
            };


        case ORDER_RECIPES_NAME:
            let recipesToOrder = action.payload === 'asc' ? 
                state.recipes.sort(function(a,b){
                    if(a.name.toLowerCase()>b.name.toLowerCase()){return 1;}
                    if(a.name.toLowerCase()<b.name.toLowerCase()){return -1;}
                    return 0;
                }) :
                state.recipes.sort(function(a,b){
                    if(a.name.toLowerCase()>b.name.toLowerCase()){return -1;}
                    if(a.name.toLowerCase()<b.name.toLowerCase()){return 1;}
                    return 0;
                }) 
                return {
                    ...state,
                    recipes : recipesToOrder,
                    actualPage:1
                }
        case ORDER_RECIPES_HEALTH_SC:
            let recipesToOrderHealth = action.payload === 'asc health' ?

                state.recipes.sort(function(a,b){
                    if(a.health_score<b.health_score) {return -1};
                    if(a.health_score>b.health_score) {return 1};
                    return 0
                }) :
                state.recipes.sort(function(a,b){
                    if(a.health_score>b.health_score) {return -1};
                    if(a.health_score<b.health_score) {return 1};
                    return 0
                })
            
            return{
                ...state,
                recipes: recipesToOrderHealth,
                actualPage:1
            }
        case CREATE_RECIPE:{
            if(action.payload)
            return {
                ...state,
                allRecipes:[...state.allRecipes,action.payload]
            }
        } 
        
        case GET_DIETS:
            {return {
                ...state,
                diets: action.payload,
                alldiets:action.payload
            }}
        case CHANGE_PAGE:
            {return {
                ...state,
                actualPage: Number(action.payload) ? parseInt(action.payload) : action.payload === 'Next' ? (parseInt(state.actualPage)+1):(parseInt(state.actualPage)-1)
            } 
            }    
        case CLEAN_DETAIL:
            {return{
                ...state,
                recipeDetail:{}
            }}

         
       
        default: 
            return {...state};    
    }
}

export default rootReducer;
