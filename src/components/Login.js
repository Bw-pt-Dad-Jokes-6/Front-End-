
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withFormik, Form, Field } from 'formik'
import cogoToast from 'cogo-toast'
import * as Yup from 'yup'




const Login = (props) => {
  console.log(props)
  const [baseURL] = useState("https://webpt7-dad-jokes.herokuapp.com/")

  const [apiAuthLoginUrlSlug] = useState("api/auth/login/")
  const [apiAuthRegisterUrlSlug] = useState("api/auth/register/")

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });



  const [bannerMessage, setBannerMessage] = useState("Please enter your e-mail and password")

  

  useEffect(() => {
    typeof props.errors.username === 'undefined' ? console.log('no error username') : cogoToast.warn(props.errors.username, {position: 'bottom-right'},)
  }, [props.errors.username])

  useEffect(()=> {
    typeof props.errors.password === 'undefined' ? console.log('no error password') : cogoToast.warn(props.errors.password, {position: 'bottom-right'},)
  }, [props.errors.password])

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
        cogoToast.success("Sorry, that login does not appear to be valid. Did you want to register instead?", {position: 'bottom-right'},)
      })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    console.log(login)
    axios.post(`${baseURL}${apiAuthRegisterUrlSlug}`, login + "", login)
      .then((res) => {
        console.log(res)
        cogoToast.success("Registering", {position: 'bottom-right'},)
        handleLogin(e)
      })
      .catch((err) => {
        console.log(err)
        cogoToast.warn("Registration was not successful, please call your friendly dad joke tech support", {position: 'bottom-right'},)
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
          e-mail
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