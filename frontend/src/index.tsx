import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



// import pages
import Home from './Home'
import FoodDetails from './FoodDetails';
import FoodAdd from './FoodAdd';
import UserFoodList from './UserFoodList';
import AdminWaitFoodList from './AdminWaitFoodList';

// Router
const router = 
<Router>
  <Routes>
    <Route path='/' element={ <Home /> } />
    <Route path='/foodsAdd' element={ <FoodAdd /> } />
    <Route path='/foodsList' element={ <UserFoodList /> } />
    <Route path='/details/:url' element={ <FoodDetails/>} />
    <Route path='/waitFoodsList' element={ <AdminWaitFoodList/> } />
  </Routes>
</Router> 

ReactDOM.render( router,document.getElementById('root') );
reportWebVitals();