import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import JokeList from './components/JokeList'
import PrivateRoute from './components/PrivateRoute'
import DevelopmentEdition from './components/DevelopmentEdition'

import "./App.scss"

function App() {
  console.log(localStorage.getItem('token'))
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
          <DevelopmentEdition />
        </Route>
         <PrivateRoute path='/jokes' component={JokeList}/>
      </Switch>
    </Router>
  );
}

export default App;
