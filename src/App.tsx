import React from "react";
import { NDSProvider } from "@nulogy/components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game } from "routes/Game";
import { Intro } from "routes/Intro";
import SignIn from "routes/SignIn";

require("dotenv").config();

const App = () => (
  <Router>
    <NDSProvider>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/:roomCode">
          <Game />
        </Route>
        <Route path="/">
          <Intro />
        </Route>
      </Switch>
    </NDSProvider>
  </Router>
);

export default App;
