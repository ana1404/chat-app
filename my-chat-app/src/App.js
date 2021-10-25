import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms";
import Login from "./components/Login";
import "./style/App.css";

function App() {

  const [log, setLog] = useState([]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login setData={ setLog }/>
        </Route>
        <Route path="/room">
          <Navbar />
          <Rooms data={ log }/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
