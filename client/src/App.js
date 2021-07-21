import './App.css';
import {Route} from 'react-router-dom';
import Home from './Components/Home/home';
import LoadingPage from './Components/LoadingPage/loadingPage';
import NavBar from './Components/NavBar/navBar';
import Form from './Components/Form/form';
import Detail from './Components/Detail/detail';



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LoadingPage}/>
      <Route path='/home' component={NavBar}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/create' component={Form}/>
      <Route exact path='/home/detail/:id' component={Detail} /> 
      
    </div>
  );
}

export default App;
