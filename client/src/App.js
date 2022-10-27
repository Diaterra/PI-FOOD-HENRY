import './App.css';
import { Route, Switch} from 'react-router-dom';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import DetailsRecipe from './components/DetailsRecipe/DetailsRecipe';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Error from './components/Error_404/Error_404'

function App() {
  return (

    <div className="App">
      <Switch>
      <Route exact path="/" component= {LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/recipes/:id" component={DetailsRecipe}/>
      <Route exact path="/createRecipe" component={CreateRecipe}/>
      <Route path={"*"} component={Error}/>
      </Switch>
     

    </div>
  
  );
}

export default App;
