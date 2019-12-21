import React from 'react';

const JokeCard = ({ setup, punchline, type }) => {


  return (
    <div>
      <p>{setup}</p>
      <p>{punchline}</p>
      <p>{type}</p>
    </div>
  )
}

export default JokeCard