import React, { useState, useEffect } from "react";
import { Input } from "@nulogy/components";
import { Button } from "./Button";
import CanvasDraw from "react-canvas-draw";

type Props = {
  onSubmit: Function,
  image?: string,
};

export const EnterPhrase: React.FC<Props> = ({ onSubmit, image }) => {
  const [phrase, setPhrase] = useState<string>("");
  const [canvasRef, setCanvasRef] = useState<any>(null);

  const handlePhraseChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setPhrase(target.value);
  };

  useEffect(() => {
    if (image && canvasRef) canvasRef.loadSaveData(image);
  }, [canvasRef, image])

  return (
    <>
      <Input
        placeholder="Please enter your guess"
        onChange={handlePhraseChange}
      />
      {image && <CanvasDraw ref={setCanvasRef} />}
      <Button onClick={() => onSubmit(phrase)}>Submit</Button>
    </>
  );
};
