import React, { useState, useEffect } from 'react'
import axios from 'axios'

import JokeCard from './JokeCard'



const JokeList = (props) => {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios
      .get("https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/10")
      .then(res => {
        // console.log(res.data);
        setJokes(res.data);
      })
      .catch(err => {
        console.log("uh-oh there was an error", err)
      })
  }, [])

  return (
    <div>
      {jokes.map(joke => {
        return <JokeCard key={joke.id} setup={joke.setup} punchline={joke.punchline} type={joke.type} />
      })}
    </div>
  )
}

export default JokeList