import React, {useContext} from 'react'

import {APIContext} from '../contexts/APIContext'
import {UIContext} from '../contexts/UIContext'

const Header = (props) => {
  //console.log(props)

  const {updater, setUpdater} = useContext(APIContext)
  const {loginToggle, setLoginToggle} = useContext(UIContext)

  return(
    <header>
      <nav>
      <div 
        className="headerButton"
        onClick={(e)=>{
          e.preventDefault()
          console.log("click")
        }}
      >
        Home
      </div>
      <div 
        className="headerButton"
        onClick={(e)=>{
          e.preventDefault()
          console.log("click")
        }}
      >
        About
      </div>
        {localStorage.getItem("token") ?  (
          <div className="headerButton"
            onClick={(e)=>{
              e.preventDefault()
              localStorage.removeItem("token")
              setUpdater(!updater)
            }}
          >Log Out</div>) : (
              <div 
                className="headerButton"
                onClick={(e)=>{
                  e.preventDefault()
                  setLoginToggle(!loginToggle)
                }}
              >Login</div>
          )
        }
      </nav>
    </header>
  )

}

export default Header