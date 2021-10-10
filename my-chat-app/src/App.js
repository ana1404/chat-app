import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import Rooms from './components/Rooms';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Login/> 
          </Route>
          <Route path="/room">
            <Rooms/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
