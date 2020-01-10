import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MaterialTable, {MTableToolbar} from 'material-table'

import {APIContext} from '../contexts/APIContext'

const HomeJokeList = () => {

  const {
    baseURL, 
    jokesSlug} = useContext(APIContext)
  const [jokes, setJokes] = useState([])
    //used as the headers in Material-Table
  const [columns] = useState(
      [
        { 
          field: "joke_body", 
          title: "Setup",
          cellStyle: {
            backgroundColor: '#916dd5',
            color: '#FFF'
          },
          headerStyle: {
            backgroundColor: '#3e206d',
            color: '#FFF'
          }
        },
        { 
          field: "punchline", 
          title: "Punchline",
          cellStyle: {
            backgroundColor: '#f0e3ff',
          },
          headerStyle: {
            backgroundColor: '#d89cf6',
            color: '#FFF'
          }
        }
      ]
    )
  useEffect(() => {
    axios
      .get(baseURL + jokesSlug)
      .then(res => {
        console.log(res.data.filter(joke => joke.user !== 2));
        setJokes(res.data.filter(joke => joke.user !== 2));
      })
      .catch(err => {
        console.log("uh-oh there was an error", err)
      })
  }, [baseURL, jokesSlug])

  return(
    <MaterialTable
        title={`Dad Jokes`}
        options={{
          pageSize: 5,
          addRowPosition: "first",
          actionsColumnIndex: 2,
          emptyRowsWhenPaging: false,
        }}
        components={{
          Toolbar: props => <MTableToolbar {...props} />
        }}

        columns={columns}

        data={jokes.reverse()}

      />
  )

}

export default HomeJokeList