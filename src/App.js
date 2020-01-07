import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import JokeList from './components/JokeList'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header.js'

import "./App.scss"

function App() {
  console.log(localStorage.getItem('token'))
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
          <PrivateRoute path='/jokes'>
            <Header />
            <JokeList />
          </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
