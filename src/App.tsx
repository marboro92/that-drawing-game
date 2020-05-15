import React, { useState } from "react";
import { NDSProvider } from "@nulogy/components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Lobby } from "routes/Lobby";
import Intro from "routes/Intro";
import Game from "routes/Game";
import HostContext from "HostContext";

require("dotenv").config();

const App = () => {
  const [isHost, setIsHost] = useState(false);
  return (
    <HostContext.Provider value={{ isHost, setIsHost }}>
      <Router>
        <NDSProvider>
          <Switch>
            <Route exact path="/">
              <Intro />
            </Route>
            <Route path="/:roomCode">
              <Lobby />
            </Route>
            <Route path="/:roomCode/game">
              <Game />
            </Route>
          </Switch>
        </NDSProvider>
      </Router>
    </HostContext.Provider>
  )
};

export default App;
