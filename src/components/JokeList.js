import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable, {MTableToolbar} from 'material-table'

//import JokeCard from './JokeCard'
import Header from './Header.js'



const JokeList = (props) => {
  const [jokes, setJokes] = useState([])
  const [columns] = useState(
    [
      {field: "joke_body", title: "Setup"},
      {field: "punchline", title: "Punchline"}
    ]
    )
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")
  const [jokesSlug] = useState('api/jokes')

  useEffect(() => {
    axios
      .get(baseURL+jokesSlug)
      //.get("https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/100")
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
    <>
    <Header />
    <div>

      {/* {jokes.map(joke => {
        return <JokeCard key={joke.id} setup={joke.setup} punchline={joke.punchline} type={joke.type} />
      })} */}

      <MaterialTable
        title={`Dad Jokes`}
        
        components={{
          Toolbar: props => <MTableToolbar {...props} />
        }}
        
        columns={columns}

        data={jokes}

        actions={[
          {
            icon: 'add',
            tooltip: 'Add Joke',
            isFreeAction: true,
            onClick: (event) => console.log("You want to add a new joke")
          },
          {
            icon: 'edit',
            tooltip: 'Edit Joke',
            onClick: (event, rowData) => console.log(`You want to edit "${rowData.setup}" joke`)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Joke',
            onClick: (event, rowData) => console.log(rowData)
          }
        ]}
        
      />
    </div>
    </>
  )
}

export default JokeList