import React, { useState } from "react";
import { Text } from "@nulogy/components";
import CanvasDraw from "react-canvas-draw";
import { Button } from './Button';

export const EnterDrawing = ({ children }: any) => {
  const [drawing, setDrawing] = useState<any>(null);

  const handleDrawingSubmit = () => {
    // console.log("User wants to submit drawing: ", drawing);
  };

  return (
    <>
      <Text>"The phrase is up here and so you can draw it"</Text>
      <CanvasDraw ref={(canvasDraw) => setDrawing(canvasDraw)} />
      <Button onClick={handleDrawingSubmit}>Submit</Button>
    </>
  );
};
