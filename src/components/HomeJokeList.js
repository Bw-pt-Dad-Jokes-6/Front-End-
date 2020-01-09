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
  }, [baseURL, jokesSlug])

  return(
    <MaterialTable
        title={`Dad Jokes`}
        options={{
          dense: true,
        }}
        components={{
          Toolbar: props => <MTableToolbar {...props} />
        }}

        columns={columns}

        data={jokes}

      />
  )

}

export default HomeJokeList