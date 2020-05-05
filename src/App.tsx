import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import { Button, NDSProvider, Box, Input, Text } from "@nulogy/components";

import DATABASE from "./database/firebase";

require("dotenv").config();

const PhaseContainer = ({ children }: { children: any }) => (
  <Box border="1px solid blue" minHeight="500px" p="x1" m="x1">
    {children}
  </Box>
);

export default class App extends Component {
  saveableCanvas: any = null;
  loadableCanvas: any = null;

  render() {
    return (
      <NDSProvider>
        {/* Phase 1: A phrase! */}
        <PhaseContainer>
          <Text>
            Pick a phrase, noun saying, anything you'd like to the other players
            to draw!
          </Text>
          <Input placeholder="A phrase..." />
          <Button>Submit</Button>
          <Text>
            Okay, hold tight! while we get phrases from all the players
          </Text>
        </PhaseContainer>
        {/* Phase 2: Time to Draw! */}
        <PhaseContainer>
          <Text>"The phrase is up here and so you can draw it"</Text>
          <CanvasDraw
            ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          />
          <Button
            onClick={async () => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.setSaveData()
              );

              await DATABASE.db.collection("cities").doc("LA").set({
                name: "Los Angeles",
                state: "CA",
                country: "USA",
              });
              alert("Success");
            }}
          >
            Done!
          </Button>
        </PhaseContainer>
        {/* Phase 3: Time to Interpret! */}
        <PhaseContainer>
          <Button
            onClick={() => {
              this.loadableCanvas.loadSaveData(
                localStorage.getItem("savedDrawing")
              );
            }}
          >
            Load!
          </Button>
          {/* <CanvasDraw
            disabled
            hideGrid
            ref={(canvasDraw) => (this.loadableCanvas = canvasDraw)}
            saveData={localStorage.getItem("savedDrawing")}
          /> */}
          <Input placeholder="okay... a guess?" />
          <Button>Submit</Button>
        </PhaseContainer>
      </NDSProvider>
    );
  }
}
