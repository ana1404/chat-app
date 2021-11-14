import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Rooms from "./components/Rooms";
import Login from "./components/Login";
import "./style/App.css";

function App() {

  const [log, setLog] = useState([]); //{name, avatar, room}
  let array = [];

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login setLog={setLog}/>
        </Route>
        <Route path="/room">
          <Rooms data={ log }/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
