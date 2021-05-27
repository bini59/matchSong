import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Main from "./component/main/main"
import Game from "./component/game/game"

const App = ()=>{
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/game/:id">
        <Game />
      </Route>
    </Switch>
  </Router>
  );
}



export default App;
