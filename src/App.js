import React, {useState} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import JokeList from './components/JokeList'
import PrivateRoute from './components/PrivateRoute'

import "./App.scss"

function App() {


  return (
    <Router>
      <>
        <Route exact path='/'>
          <Login />
        </Route>
        <PrivateRoute path='/jokes/' component={JokeList}/>
      </>
    </Router>
  );
}

export default App;
