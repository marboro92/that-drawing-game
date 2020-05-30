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
  const { room, playerName, roundNumber } = useContext(HostContext);

  const handleSubmit = () => {
    const drawing = canvasRef.getSaveData();
    onSubmit(drawing);
  };

  const getPhrase = () => {
    const playersInRoom: string[] = Object.keys(room.players).sort();
    const indexOfCurrentPlayer = playersInRoom.indexOf(playerName);
    const isLastPlayer = indexOfCurrentPlayer === playersInRoom.length - 1;
    const neighboursName = isLastPlayer
      ? playersInRoom[0]
      : playersInRoom[indexOfCurrentPlayer + 1];
    const phrase = room.players[neighboursName][roundNumber - 2] || "!!! BUG: MISSING PHRASE!!!";
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
