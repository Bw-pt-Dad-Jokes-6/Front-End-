import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


const Login = (props) => {
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")

  const [apiAuthLoginUrlSlug] = useState("api/auth/login/")
  const [apiAuthRegisterUrlSlug] = useState("api/auth/register/")
 
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [bannerMessage, setBannerMessage] = useState("Enter your username and Password")

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post(`${baseURL}${apiAuthLoginUrlSlug}`, login)
      .then((res) => {
        console.log(res)
        setBannerMessage("Logging In")
        localStorage.setItem('token', res.data.payload)
        props.history.push('/jokes/')
      })
      .catch((err) =>{
        console.log(err)
        setBannerMessage("Sorry that is an invalid login, did you mean to hit the register button?")
      })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    axios.put(`${baseURL}${apiAuthRegisterUrlSlug}`, login)
      .then((res) => {
        console.log(res)
        setBannerMessage("Registering")
        handleLogin(e)
      })
      .catch((err) =>{
        console.log(err)
        setBannerMessage("This should not happen... rick and morty loves submissions... write to them today")
      })
  }


  return (
    <>
      <h2>
        {bannerMessage}
      </h2>
      <form
        onSubmit={e => {
          handleLogin(e)
        }}
      >
        <label
          htmlFor="username"
        >
          Username
          <input
            name="username"
            value={login.username}
            onChange={e => {
              setLogin([e.target.name], e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="password"
        >
          Password
          <input
            name="password"
            value={login.password}
            onChange={e => {
              setLogin([e.target.name], e.target.value);
            }}
          />
        </label>
        <button type="submit">Login</button>
        <button 
          type="button" 
          onClick={(e)=>{
            handleRegister(e)
          }}
        >
          Register
        </button>
      </form>
    </>
  )
}

export default Login;