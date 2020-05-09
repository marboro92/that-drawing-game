import React from "react";
import CanvasDraw from "react-canvas-draw";
import { useParams } from "react-router-dom";
import { Button, Input, Text } from "@nulogy/components";

import { PhaseContainer } from "components/PhaseContainer";

export const Game = ({ children }: any) => {
  const { roomCode } = useParams();
  console.log(roomCode);
  return (
    <>
      {/* Phase 0: IF the game hasn't started yet */}
      <PhaseContainer>
        <Text>Welcome!</Text>
        <Input placeholder="Enter your screen name" />
        <Button>Submit</Button>
      </PhaseContainer>
      {/* Phase 1: A phrase! */}
      <PhaseContainer>
        <Text>
          Pick a phrase, noun saying, anything you'd like to the other players
          to draw!
        </Text>
        <Input placeholder="A phrase..." />
        <Button>Submit</Button>
        <Text>Okay, hold tight! while we get phrases from all the players</Text>
      </PhaseContainer>
      {/* Phase 2: Time to Draw! */}
      <PhaseContainer>
        <Text>"The phrase is up here and so you can draw it"</Text>
        <CanvasDraw
        // ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
        />
        <Button onClick={() => {}}>Done!</Button>
      </PhaseContainer>
      {/* Phase 3: Time to Interpret! */}
      <PhaseContainer>
        <Button
          onClick={() => {
            // this.loadableCanvas.loadSaveData(
            //   localStorage.getItem("savedDrawing")
            // );
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
    </>
  );
};
