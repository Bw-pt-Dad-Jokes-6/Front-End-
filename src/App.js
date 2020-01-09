import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {APIContext} from './contexts/APIContext'
import Login from './components/Login';
import JokeList from './components/JokeList'
import PrivateRoute from './components/PrivateRoute'


import "./App.scss"





function App() {
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")
  const [jokesSlug] = useState('api/jokes')
  const [addJokeSlug] = useState('api/jokes/create')
  const [deleteJokeSlug] = useState('api/jokes/remove/')
  const [updateJokeSlug] = useState('api/jokes/edit/')
  const [updater, setUpdater] = useState(false)

  return (
    <APIContext.Provider value={{baseURL, jokesSlug, addJokeSlug, deleteJokeSlug, updateJokeSlug, updater, setUpdater}}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <PrivateRoute path='/jokes' component={JokeList} />
        </Switch>
      </Router>
    </APIContext.Provider>
  );
}

export default App;
