import React, { useState } from "react";
import { NDSProvider } from "@nulogy/components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "typeface-open-sans";

import Lobby from "routes/Lobby";
import Intro from "routes/Intro";
import Game from "routes/Game";
import HostContext from "HostContext";

require("dotenv").config();

const App = () => {
  const [isHost, setIsHost] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [room, setRoom] = useState<{} | null>("");

  const contextValue = {
    isHost,
    playerName,
    roomId,
    room,
    setIsHost,
    setPlayerName,
    setRoomId,
    setRoom,
  };

  return (
    <HostContext.Provider value={contextValue}>
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
    </HostContext.Provider>
  );
};

export default App;
