import React, {useContext} from 'react'

import {APIContext} from '../contexts/APIContext'

const Header = (props) => {
  //console.log(props)

  const {updater, setUpdater} = useContext(APIContext)

  return(
    <header>
      <nav>
        {localStorage.getItem("token") ?  (
          <div class="headerButton"
            onClick={(e)=>{
              e.preventDefault()
              localStorage.removeItem("token")
              setUpdater(!updater)
            }}
          >Log Out</div>) : (
          <div class="headerButton">
            Home
          </div>
        )}
      </nav>
    </header>
  )

}

export default Header