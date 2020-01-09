//dependencies
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { withFormik, Form, Field } from 'formik'
import cogoToast from 'cogo-toast'
import * as Yup from 'yup'

//modules
import {APIContext} from '../contexts/APIContext'
import {UserContext} from '../contexts/UserContext'
import {UIContext} from '../contexts/UIContext'
import Header from './Header'
import HomeJokeList from './HomeJokeList'

const Login = (props) => {

  //context destructuring
  const {baseURL, apiAuthLoginUrlSlug, apiAuthRegisterUrlSlug} = useContext(APIContext)
  const {setUserState} = useContext(UserContext)
  const {loginToggle} = useContext(UIContext)

  //initial data for the login values in form
  const [login, setLogin] = useState({
    "username": "",
    "password": ""
  });

  //banner message for the login page
  const [bannerMessage] = useState("Please enter your e-mail and password")
  
  //username useEffect
  useEffect(() => {
    typeof props.errors.username === 'undefined' ? console.log('valid or empty username') : cogoToast.warn(props.errors.username, {position: 'bottom-right'},)
  }, [props.errors.username])

  //password useEffect
  useEffect(()=> {
    typeof props.errors.password === 'undefined' ? console.log('valid or empty password') : cogoToast.warn(props.errors.password, {position: 'bottom-right'},)
  }, [props.errors.password])

  //login handler
  const handleLogin = (e) => {
    e.preventDefault()
    //console.log(login)
    axios.post(`${baseURL}${apiAuthLoginUrlSlug}`, login)
      .then((res) => {
        //console.log(res)
        cogoToast.success("Logging In" , {position: 'bottom-right'},)
        localStorage.setItem('token', res.data.token)
        setUserState(res)
        //console.log(userState)        
      })
      .catch((err) => {
        console.log(err)
        cogoToast.error("Sorry, that login does not appear to be valid. Did you want to register instead?", {position: 'bottom-right'},)
      })
  }

  //register handler
  const handleRegister = (e) => {
    e.preventDefault()
    console.log(login)
    axios.post(`${baseURL}${apiAuthRegisterUrlSlug}`, login)
      .then((res) => {
        console.log(res)
        cogoToast.success("Registering", {position: 'bottom-right'},)
        handleLogin(e)
      })
      .catch((err) => {
        console.log(err)
        cogoToast.error("Registration was not successful, please call your friendly dad joke tech support", {position: 'bottom-right'},)
      })
  }

  // form data change handler
  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }


  return (
    <>
      {
        localStorage.getItem('token')?(
          <Redirect to="/jokes/" />
        ):(
        <>
          <Header />
          <article>
            <section className={ loginToggle ? '' : 'hidden'}>
              <h2>
                {bannerMessage}
              </h2>
              <Form
                className="loginForm"
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
                    // value={props.values.username}
                    value={login.username}
                    onChange={e => {
                      handleChange(e)              
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
                    //value={props.values.password}
                    value={login.password}
                    onChange={e => {
                      handleChange(e)
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
            </section>
            <section>
              <HomeJokeList />
            </section>
            <img src="https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Father and Son Laughing a a joke" />
          </article>
        </>
        )
      }
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
    username: Yup.string().email("Must be Formatted ???@???.???").required("Enter your email"),
    password: Yup.string().min(5).required("Enter your password")
  })
})(Login)

export default FormikLoginForm;