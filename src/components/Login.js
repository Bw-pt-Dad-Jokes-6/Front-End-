import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


const Login = (props) => {
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")
  const [header] = useState(
    {
      contentType: "application/json",
      username: "",
      password: ""
    }
  )

  const [apiAuthLoginUrlSlug] = useState("api/auth/login/")
  const [apiAuthRegisterUrlSlug] = useState("api/auth/register/")
 
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [bannerMessage, setBannerMessage] = useState("Enter your username and Password")

  // useEffect(()=>{
  //   localStorage.clear()
  // })

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(login)
    axios.post(`${baseURL}${apiAuthLoginUrlSlug}`, login + "", login)
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
    console.log(login)
    axios.post(`${baseURL}${apiAuthRegisterUrlSlug}`, login + "", login)
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

  const handleChange = e => {
    setLogin({...login, [e.target.name]: e.target.value})
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
              handleChange(e)
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
              handleChange(e)
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