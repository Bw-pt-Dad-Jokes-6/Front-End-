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
      <a href="https://dadjokes6marketingpage.netlify.com/"><div 
        className="headerButton"
        
      >
        Home
      </div></a>
      <a href="https://dadjokes6marketingpage.netlify.com/about.html"><div 
        className="headerButton"
        
      >
        About
      </div></a>
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