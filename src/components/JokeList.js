import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import cogoToast from 'cogo-toast'

//import JokeCard from './JokeCard'
import Header from './Header.js'
//import AddJokeForm from './AddJokeForm'
//import EditRow from './EditRow'
import axiosWithAuth from './axiosWithAuth.js'



const JokeList = (props) => {
  const [jokes, setJokes] = useState([])
  //used as the headers in Material-Table
  const [columns] = useState(
    [
      { field: "joke_body", title: "Setup" },
      { field: "punchline", title: "Punchline" }
    ]
  )
  //const [baseURL] = useState("https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/50")

  //our baseURL, with the joke slug for getting all jokes. 
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")
  //const [baseURL] = useState("http://localhost:5000/")
  const [jokesSlug] = useState('api/jokes')
  const [addJokeSlug] = useState('api/jokes/create')
  const [deleteJokeSlug] = useState('api/jokes/remove/')
  const [updateJokeSlug] = useState('api/jokes/edit/')
  const [updater, setUpdater] = useState(false)

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