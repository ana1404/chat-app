import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Rooms from "./components/Rooms";
import Login from "./components/Login";
import "./style/App.css";

function App() {
  const [log, setLog] = useState([]); 
  const [usersOnline, setUsersOnline] = useState([]);
  const [lightDark, setLightDark] = useState(false);
  const [drone, setDrone] = useState();

  useEffect(() => {
    if (lightDark) {
      document.getElementById("root").classList.add('light');
    }
    else {
      document.getElementById("root").classList.remove('light');
    }
  }, [lightDark]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Login
            setLog={setLog}
            setLightDark={setLightDark}
            lightDark={lightDark}
            drone={drone}
            setDrone={setDrone}
          />
          
        </Route>
        <Route path="/room">
          <Rooms
            log={log} 
            setLog={setLog} 
            usersOnline={usersOnline} 
            setUsersOnline={setUsersOnline} 
            setLightDark={setLightDark}
            lightDark={lightDark}
            drone={drone}
            setDrone={setDrone}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
