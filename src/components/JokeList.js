import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialTable, { MTableToolbar } from 'material-table'

//import JokeCard from './JokeCard'
import Header from './Header.js'
import AddJokeForm from './AddJokeForm'
import EditRow from './EditRow'
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
  const [jokesSlug] = useState('api/jokes')
  const [addJokeSlug] =useState('api/jokes/create')
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
  }, [updater])

  useEffect(() => {
    console.log(jokes)
  }, [jokes])

  useEffect(() => {
    console.log(columns)
  }, [columns])

  // return (
  //   <>
  //     <Header />
  //     <div>

  //       {/* {jokes.map(joke => {
  //       return <JokeCard key={joke.id} setup={joke.setup} punchline={joke.punchline} type={joke.type} />
  //     })} */}

  //       <MaterialTable
  //         title={`Dad Jokes`}

  //         // components={{
  //         //   Toolbar: props => <MTableToolbar {...props} />
  //         // }}

  //         columns={columns}

  //         data={jokes}

  //         actions={[
  //           {
  //             icon: 'add',
  //             tooltip: 'Add Joke',
  //             isFreeAction: true,
  //             onClick: (event) => (<AddJokeForm />)
  //           },
  //           {
  //             icon: 'edit',
  //             tooltip: 'Edit Joke',
  //             onClick: (event, rowData) => (<EditRow rowData={rowData} />)
  //           },
  //           {
  //             icon: 'delete',
  //             tooltip: 'Delete Joke',
  //             onClick: (event, rowData) => console.log(rowData) //to be replaced by axios with auth
  //           }
  //         ]}

  //       />
  //     </div>
  //   </>
  // )

  return (
    <>
      <Header />
      <div>
        <MaterialTable
          title={`Dad Jokes`}
          columns={columns}
          data={jokes}

          // actions={[
          //   {
          //     icon: 'add',
          //     tooltip: 'Add Joke',
          //     isFreeAction: true,
          //     onClick: (event) => (<AddJokeForm />)
          //   }
          // ]}

          editable={{
            onRowAdd: newJoke =>
              new Promise(resolve => {
                setTimeout(() => {
                  setJokes(prevJokes => {
                    const data = [...prevJokes];
                    console.log(data)
                    console.log(newJoke);
                    axiosWithAuth().post(`${baseURL}${addJokeSlug}`, newJoke)
                    .catch(err => {
                      console.log("uh-oh there was an error", err)
                    })
                    setUpdater(!updater)
                  })
                  resolve();
                }, 600);
              }),
            // onRowUpdate: (newJoke, oldJoke) =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       const joke = [...jokes];
            //       joke[joke.indexOf(oldJoke)] = newJoke;
            //       axios
            //         .put(`${baseURL}${jokesSlug}/edit/${joke.id}`, newJoke, {
            //           params: {
            //             id: jokes[0].id
            //           }
            //         })
            //         .then(res => console.log(res.joke));
            //       setJokes({ ...jokes, joke });
            //     }, 600);
            //   }),
            // onRowDelete: oldJoke =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       const data = [...jokes];
            //       data.splice(data.indexOf(oldJoke), 1);
            //       axios
            //         .delete(baseURL + jokesSlug, {
            //           params: {
            //             id: jokes[0].id
            //           }
            //         })
            //         .then(res => console.log(res.data));
            //       setJokes({ ...jokes, data });
            //     }, 600);
            //   })
          }}
        />
      </div>
    </>
  );
}

export default JokeList