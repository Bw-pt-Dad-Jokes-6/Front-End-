import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';

import "./App.scss"

function App() {
  return (
    <Router>
      <div
        className="App"
        onClick={(e) => { console.log("yeeet") }}
      >
        <Route path='/'>
          <Login />
        </Route>

      </div>
    </Router>
  );
}

export default App;
