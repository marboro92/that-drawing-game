import React, { useState } from "react";
import { Text } from "@nulogy/components";
import CanvasDraw from "react-canvas-draw";
import { Button } from "./Button";

type Props = {
  children?: React.ReactNode;
  onSubmit: Function;
};

export const EnterDrawing: React.FC<Props> = ({ onSubmit, children }) => {
  const [canvasRef, setCanvasRef] = useState<any>(null);

  const handleSubmit = () => {
    const drawing = canvasRef.getSaveData();
    onSubmit(drawing);
  }

  return (
    <>
      <Text>"The phrase is up here and so you can draw it"</Text>
      <CanvasDraw ref={setCanvasRef} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};
