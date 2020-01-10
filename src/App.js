// dependencies
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// modules
import {APIContext} from './contexts/APIContext'
import {UserContext} from './contexts/UserContext'
import {UIContext} from './contexts/UIContext'
import Login from './components/Login';
import JokeList from './components/JokeList'
import PrivateRoute from './components/PrivateRoute'

// css
import "./App.scss"

function App() {
  // URL State
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")
  // CRUD State
  const [jokesSlug] = useState('api/jokes')
  const [addJokeSlug] = useState('api/jokes/create')
  const [deleteJokeSlug] = useState('api/jokes/remove/')
  const [updateJokeSlug] = useState('api/jokes/edit/')
  // used in Login/Register form
  const [apiAuthLoginUrlSlug] = useState("api/auth/login/")
  const [apiAuthRegisterUrlSlug] = useState("api/auth/register/")
  // force API call when required just use setUpdater(!updater) (a part of API State)
  const [updater, setUpdater] = useState(false)

  // User State
  const [userState, setUserState] = useState({})

  // UI State
  const [loginToggle, setLoginToggle] = useState(false)
  const [columns] = useState(
    [
      { 
        field: "joke_body", 
        title: "Setup", 
        cellStyle: {
          backgroundColor: '#f0e3ff',
        },
        headerStyle: {
          backgroundColor: '#d89cf6',
          color: '#FFF'
        }
      },
      { 
        field: "punchline", 
        title: "Punchline",
        cellStyle: {
          backgroundColor: '#916dd5',
          color: '#FFF'
        },
        headerStyle: {
          backgroundColor: '#3e206d',
          color: '#FFF'
        }
      }
    ]
  )

  return (
    <APIContext.Provider value={{baseURL, jokesSlug, addJokeSlug, deleteJokeSlug, updateJokeSlug, updater, setUpdater, apiAuthLoginUrlSlug, apiAuthRegisterUrlSlug}}>
    <UserContext.Provider value={{userState, setUserState}}>
    <UIContext.Provider value={{loginToggle, setLoginToggle, columns}}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <PrivateRoute path='/jokes' component={JokeList} />
        </Switch>
      </Router>
    </UIContext.Provider>
    </UserContext.Provider>
    </APIContext.Provider>
  );
}

export default App;
