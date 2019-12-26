import React from 'react'
import cogoToast from 'cogo-toast'


const DevelopmentEdition = () => {
  return(
    <div>
        <div>Development Edition</div>
        <div
          onClick={()=>
            {
              console.log("click")
              localStorage.setItem("token", "ohmuhgawd_we_got_haxed")
              cogoToast.success("I solemnly swear I'm upto no good", {position: 'bottom-right'},)
            }
          }
        >token</div>
        <div
          onClick={()=>
            {
              console.log("click")
              localStorage.clear()
              cogoToast.success("Mischief Managed", {position: 'bottom-right'},)
            }
          }
        >clear token</div>
      </div>
  )
}

export default DevelopmentEdition