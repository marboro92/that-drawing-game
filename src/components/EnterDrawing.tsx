import React, { useState, useContext } from "react";
import { Text } from "@nulogy/components";
import CanvasDraw from "react-canvas-draw";
import { Button } from "./Button";
import HostContext from "HostContext";

type Props = {
  children?: React.ReactNode;
  onSubmit: Function;
};

export const EnterDrawing: React.FC<Props> = ({ onSubmit, children }) => {
  const [canvasRef, setCanvasRef] = useState<any>(null);
  const { room, playerName } = useContext(HostContext);

  const handleSubmit = () => {
    const drawing = canvasRef.getSaveData();
    onSubmit(drawing);
  };

  const getPhrase = () => {
    const playersInRoom: string[] = Object.keys(room.players).sort();
    const indexOfCurrentPlayer = playersInRoom.indexOf(playerName);
    const isLastPlayer = indexOfCurrentPlayer === playersInRoom.length - 1;
    const neighbour = isLastPlayer
      ? playersInRoom[0]
      : playersInRoom[indexOfCurrentPlayer - 1];
    const phrase = "there isn't one yet";
    //TODO: Fix this
    // const phrase = room.players[neighbour][0] || "there isn't one yet";
    return phrase;
  };

  return (
    <>
      <Text>{getPhrase()}</Text>
      <CanvasDraw ref={setCanvasRef} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};
