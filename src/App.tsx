import React from "react";
import { NDSProvider } from "@nulogy/components";

// import DATABASE from "./database/firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Game } from "./routes/Game";
import { Intro } from './routes/Intro';

require("dotenv").config();

// const fetchData = async () => {

//           await DATABASE.db.collection("cities").doc("LA").set({
//             name: "Los Angeles",
//             state: "CA",
//             country: "USA",
//           });
//           alert("Success");
//         }

const App = () => <Router>
  <NDSProvider>
    <Switch>
      <Route path="/:roomCode">
        <Game />
      </Route>
      <Route path="/">
        <Intro />
      </Route>
    </Switch>
  </NDSProvider>
</Router>


export default App;
