import React, {useContext} from 'react'

import {APIContext} from '../contexts/APIContext'

const Header = (props) => {
  //console.log(props)

  const {updater, setUpdater} = useContext(APIContext)

  return(
    localStorage.getItem("token") ?  (<div
      onClick={(e)=>{
        e.preventDefault()
        localStorage.removeItem("token")
        setUpdater(!updater)
      }}
    >Log Out</div>) : (
      <div>
        Link to marketing page
      </div>
    )
  )

}

export default Header