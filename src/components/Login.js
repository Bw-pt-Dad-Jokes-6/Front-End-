
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'



const Login = (props) => {
  console.log(props)
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



  const [bannerMessage, setBannerMessage] = useState("please enter username and password")

  // if (props.errors.username === undefined) {
  //   console.log(true)
  // }

  useEffect(() => {

    if (props.errors.username === null) {
      setBannerMessage(props.errors.username)
    }
    // props.errors.username ? setBannerMessage(props.errors.username) : setBannerMessage('2')
    // props.errors.password ? setBannerMessage(`${bannerMessage} ${props.errors.password}`) : setBannerMessage(bannerMessage)
    // setBannerMessage(`${props.errors.username} ${props.errors.password}`)
  }, [props.errors.username, props.errors.password])

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
      .catch((err) => {
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
      .catch((err) => {
        console.log(err)
        setBannerMessage("This should not happen... rick and morty loves submissions... write to them today")
      })
  }

  const handleChange = e => {
    props.setValues({ ...props.values, [e.target.name]: e.target.value })
  }


  return (
    <>
      <h2>
        {bannerMessage}
      </h2>
      <Form
        onSubmit={e => {
          handleLogin(e)
        }}
      >
        <label
          htmlFor="username"
        >
          Username
          <Field
            name="username"
            type="email"
            value={props.values.username}
            onChange={e => {
              props.handleChange(e)
              // setBannerMessage(`${props.errors.username}`)
            }}
          />
        </label>
        <label
          htmlFor="password"
        >
          Password
          <Field
            name="password"
            type="password"
            value={props.values.password}
            onChange={e => {
              props.handleChange(e)
              // setBannerMessage(`${props.errors.password}`)
            }}
          />
        </label>
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={(e) => {
            handleRegister(e)
          }}
        >
          Register
        </button>
      </Form>
    </>
  )
}

const FormikLoginForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || ""
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().email("Inside email").required("Enter your email"),
    password: Yup.string().min(5).required("Enter your password")
  })
})(Login)

export default FormikLoginForm;