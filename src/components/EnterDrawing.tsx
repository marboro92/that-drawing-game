import React, { useState } from "react";
import { Text } from "@nulogy/components";
import CanvasDraw from "react-canvas-draw";
import { postContent } from "database/content";
import { Button } from "./Button";

type Props = {
  children?: React.ReactNode;
};

export const EnterDrawing: React.FC<Props> = ({ children }) => {
  const [drawing, setDrawing] = useState<any>(null);

  const handleDrawingSubmit = () => {
    console.log("User wants to submit drawing: ", drawing);
    //TODO: Convert to Base64 first
    postContent({ roomId: "1234", content: "drawing" });

    //TODO: Post phrase to db under "rooms"
  };

  return (
    <>
      <Text>"The phrase is up here and so you can draw it"</Text>
      <CanvasDraw ref={(canvasDraw) => setDrawing(canvasDraw)} />
      <Button onClick={handleDrawingSubmit}>Submit</Button>
    </>
  );
};
