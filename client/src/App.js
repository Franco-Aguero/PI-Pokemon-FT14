import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './Components/Home/home';
import LoadingPage from './Components/LoadingPage/loadingPage';
import NavBar from './Components/NavBar/navBar';
import Form from './Components/Form/form';
import Detail from './Components/Detail/detail';
import PageNotFound from './PageNotFound/pageNotFound';

function App() {
  return (
    <div className="App">
      <Route path='/home' component={NavBar}/>
      <Switch>
        <Route exact path='/' component={LoadingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path='/home/create' component={Form}/>
        <Route exact path='/home/detail/:id' component={Detail} /> 
        <Route component={PageNotFound} /> 
      </Switch>
    </div>
  );
}

export default App;
