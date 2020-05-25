import React, { useState, useContext } from "react";

import { EnterPhrase } from "components/EnterPhrase";
import { EnterDrawing } from "components/EnterDrawing";
import { PhaseContainer } from "../components/PhaseContainer";
import { postContent } from "database/content";
import HostContext from "../HostContext";

type Props = {
  children?: React.ReactNode;
};

const Game: React.FC<Props> = ({ children }) => {
  const { playerName, roomId } = useContext(HostContext);
  const [isDrawPhase, setIsDrawPhase] = useState(false);

  const handleGuessSubmit = async (phrase: string) => {
    console.log("User wants to submit phrase: ", phrase);
    await postContent({
      roomId,
      content: phrase,
      playerName,
    });
    setIsDrawPhase(true);
  };

  const handleDrawingSubmit = (drawing: string) => {
    console.log("User wants to submit drawing: ", drawing);
    postContent({
      roomId,
      content: drawing,
      playerName,
    });

    setIsDrawPhase(false);
  };

  return (
    <PhaseContainer>
      {!isDrawPhase ? (
        <EnterPhrase onSubmit={handleGuessSubmit} />
      ) : (
        <EnterDrawing onSubmit={handleDrawingSubmit} />
      )}
    </PhaseContainer>
  );

  // return (
  //   <>
  //     {/* Phase 0: IF the game hasn't started yet */}
  //     <PhaseContainer>
  //       <Text>Welcome!</Text>
  //       <Input
  //         placeholder="Enter your player name"
  //         onChange={playerNameHandler}
  //       />
  //       <Button onClick={joinRoom}>Submit</Button>
  //     </PhaseContainer>

  //     {/* TODO: Only show after playerName submitted */}
  //     {/* Phase 1: A phrase! */}
  //     <PhaseContainer>
  //       <Text>
  //         Pick a phrase, noun saying, anything you'd like to the other players
  //         to draw!
  //       </Text>
  //       <Input placeholder="A phrase..." />
  //       <Button>Submit</Button>
  //       <Text>Okay, hold tight! while we get phrases from all the players</Text>
  //     </PhaseContainer>
  //     {/* Phase 2: Time to Draw! */}
  //     <PhaseContainer>
  //       <Text>"The phrase is up here and so you can draw it"</Text>
  //       <CanvasDraw
  //       // ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
  //       />
  //       <Button onClick={() => {}}>Done!</Button>
  //     </PhaseContainer>
  //     {/* Phase 3: Time to Interpret! */}
  //     <PhaseContainer>
  //       <Button
  //         onClick={() => {
  //           // this.loadableCanvas.loadSaveData(
  //           //   localStorage.getItem("savedDrawing")
  //           // );
  //         }}
  //       >
  //         Load!
  //       </Button>
  //       {/* <CanvasDraw
  //       disabled
  //       hideGrid
  //       ref={(canvasDraw) => (this.loadableCanvas = canvasDraw)}
  //       saveData={localStorage.getItem("savedDrawing")}
  //     /> */}
  //       <Input placeholder="okay... a guess?" />
  //       <Button>Submit</Button>
  //     </PhaseContainer>
  //   </>
  // );
};

export default Game;
