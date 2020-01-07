import React from 'react'
import {Redirect} from 'react-router-dom'

const Header = (props) => {
  console.log(props)

  return(
    <div
      onClick={(e)=>{
        e.preventDefault()
        console.log(localStorage.getItem("token"))
        localStorage.removeItem("token")
        (<Redirect to="/" />)
      }}
    >this is sparta!!!!!</div>
  )

}

export default Header