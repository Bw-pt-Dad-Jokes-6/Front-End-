import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable, {MTableToolbar} from 'material-table'

//import JokeCard from './JokeCard'



const JokeList = (props) => {
  const [jokes, setJokes] = useState([])
  const [columns] = useState(
    [
      {field: "setup", title: "Setup"},
      {field: "punchline", title: "Punchline"},
      {field: "type", title: "Category"},
      {field: "id", title: "Joke Number"}
    ]
    )


  useEffect(() => {
    axios
      .get("https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/10")
      .then(res => {
        console.log(res.data);
        setJokes(res.data);
      })
      .catch(err => {
        console.log("uh-oh there was an error", err)
      })
  }, [])

  useEffect(() => {
    console.log(jokes)
  }, [jokes])

  useEffect(() => {
    console.log(columns)
  }, [columns])

  return (
    <div>

      {/* {jokes.map(joke => {
        return <JokeCard key={joke.id} setup={joke.setup} punchline={joke.punchline} type={joke.type} />
      })} */}

      <MaterialTable
        title={`Dad Jokes`}
        options={{
          dense: true,
          exportButton: true
        }}
        components={{
          Toolbar: props => <MTableToolbar {...props} />
        }}
        
        columns={columns}

        data={jokes}
        
      />
    </div>
  )
}

export default JokeList