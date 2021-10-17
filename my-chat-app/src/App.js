import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import Rooms from './components/Rooms';
import Login from './components/Login';
import './style/App.css'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
          <Navbar/>
            <Login/> 
          </Route>
          <Route path="/room">
            <Rooms/>
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
