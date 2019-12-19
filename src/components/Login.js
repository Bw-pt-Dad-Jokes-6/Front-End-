import React, { useState } from 'react';



const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });



  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log("sumbitted")
        }}
      >
        <label
          htmlFor="username"
        >
          Usersname
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
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Login;