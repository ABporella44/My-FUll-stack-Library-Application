import logo from './logo.svg';
import './App.css';
import Login from "../src/authenticationPages/login"
import { BrowserRouter, Route, Switch} from "react-router-dom";
import DisplayBook from './LandingPage/prodcutDisplay';
import Cart from './LandingPage/cart';
import Homepage from './LandingPage/homePage';
import Navigation from './LandingPage/navigation';
import { useState } from 'react';
import { globalState } from './authenticationPages/contextProvider';
import React from 'react';
import CartProvider from './authenticationPages/contextProvider';

function App() {
  return (  
  <CartProvider>
     <BrowserRouter >
        <Route exact path='/' component={Login}/>
        <Route path="/Navigation" component={Navigation}/>
     <Switch >
        <Route path='/Navigation/displayBook' component={DisplayBook}/>
        <Route path='/Navigation/cart' component={Cart}/>
        <Route path='/Navigation/homePage'  component={Homepage}/>
     </Switch>
   </BrowserRouter>  
  </CartProvider>
  );
}

export default App;
