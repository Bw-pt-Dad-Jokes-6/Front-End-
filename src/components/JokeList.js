// dependencies
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import cogoToast from 'cogo-toast'

// modules
import Header from './Header.js'
import axiosWithAuth from './axiosWithAuth.js'
import {APIContext} from '../contexts/APIContext'
//import{UserContext} from '../contexts/UserContext'


// our initial joke source while we were waiting on the back end
// https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/50
// gets 50 jokes
// note, setup is used instead of joke_body

const JokeList = () => {

  const {
    baseURL, 
    jokesSlug, 
    addJokeSlug, 
    deleteJokeSlug, 
    updateJokeSlug, 
    updater, 
    setUpdater} = useContext(APIContext)

    //const {userState} = useContext(UserContext)

  const [jokes, setJokes] = useState([])
  //used as the headers in Material-Table
  const [columns] = useState(
    [
      { field: "joke_body", title: "Setup" },
      { field: "punchline", title: "Punchline" }
    ]
  )
  
  useEffect(() => {
    axios
      .get(baseURL + jokesSlug)
      .then(res => {
        console.log(res.data);
        setJokes(res.data);
      })
      .catch(err => {
        console.log("uh-oh there was an error", err)
      })
  }, [baseURL, jokesSlug, updater])

  useEffect(() => {
    console.log(jokes)
  }, [jokes])

  useEffect(() => {
    console.log(columns)
  }, [columns])

  const addJoke = (newJoke) => {
    axiosWithAuth()
      .post(`${baseURL}${addJokeSlug}`, newJoke)
      .then(res => { 
        console.log(res)
      })
      .catch(err => {
        console.log("uh-oh there was an error", err)
      })
      .finally(() => setUpdater(!updater))
  }

  const deleteJoke = (jokeNumber) => {
    axiosWithAuth()
      .put(`${baseURL}${deleteJokeSlug}${jokeNumber}`)
      .then(res => {
        console.log(res)
        res.data.Error ? cogoToast.warn("This is not your Joke: so you can't delete it", {position: 'bottom-right'},) : console.log(res)
      })
      .catch(err => {
        console.log(err)
        
      })
      .finally(() => setUpdater(!updater))
  }

  const editJoke = (joke) => {
    console.log(joke)
    axiosWithAuth()
      .put(`${baseURL}${updateJokeSlug}${joke.id}`, joke)
      .then(res => {
        console.log(res)
        res.data.Error ? cogoToast.warn("This is not your Joke: so you can't edit it", {position: 'bottom-right'},) : console.log(res)
      })
      .catch(err => {
        console.log(err)
        
      })
      .finally(() => setUpdater(!updater))
  }

  

  return (
    <>
      <Header />
      <div>
        <MaterialTable
          title={`Dad Jokes`}
          columns={columns}
          data={jokes}

          editable={{
            onRowAdd: newJoke => 
              new Promise(resolve => {
                setTimeout(() => {
                  addJoke(newJoke)
                  resolve()
                }, 600)
              }),
            onRowUpdate: (newJoke) =>
              new Promise(resolve => {
                setTimeout(() => {
                  editJoke(newJoke)
                  resolve();
                }, 600);
              }),
            onRowDelete: oldJoke =>
              new Promise(resolve => {
                setTimeout(() => {
                  deleteJoke(oldJoke.id)
                  resolve();
                }, 600);
              })
          }}
        />
      </div>
    </>
  );
}

export default JokeList