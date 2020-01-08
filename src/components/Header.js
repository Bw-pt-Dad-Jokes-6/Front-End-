import React from 'react'


const Header = (props) => {
  console.log(props)

  return(
    <div
      onClick={(e)=>{
        e.preventDefault()
        console.log(localStorage.getItem("token"))
        localStorage.removeItem("token")
      }}
    >this is sparta!!!!!</div>
  )

}

export default Header