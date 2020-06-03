import React, { useState } from "react";
import { Text } from "@nulogy/components";
import CanvasDraw from "react-canvas-draw";
import { Button } from "./Button";

type Props = {
  phrase: string;
  onSubmit: Function;
};

export const EnterDrawing: React.FC<Props> = ({ onSubmit, phrase }) => {
  const [canvasRef, setCanvasRef] = useState<any>(null);

  const handleSubmit = () => {
    const drawing = canvasRef.getSaveData();
    onSubmit(drawing);
  };

  return (
    <>
      <Text>{phrase}</Text>
      <CanvasDraw ref={setCanvasRef} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};
