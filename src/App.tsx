import React from "react";
import { NDSProvider } from "@nulogy/components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Lobby } from "routes/Lobby";
import Intro from "routes/Intro";
import Game from "routes/Game";

require("dotenv").config();

const App = () => (
  <Router>
    <NDSProvider>
      <Switch>
        <Route exact path="/">
          <Intro />
        </Route>
        <Route path="/:roomCode/game">
          <Game />
        </Route>
        <Route path="/:roomCode">
          <Lobby />
        </Route>
      </Switch>
    </NDSProvider>
  </Router>
);

export default App;
