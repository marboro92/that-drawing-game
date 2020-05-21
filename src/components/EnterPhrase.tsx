import React, { useState } from "react";
import { Input } from "@nulogy/components";
import { Button } from "./Button";

type Props = {
  children?: React.ReactNode,
  onSubmit: Function
};

export const EnterPhrase: React.FC<Props> = ({ onSubmit, children }) => {
  const [phrase, setPhrase] = useState<string>("");

  const handlePhraseChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setPhrase(target.value);
  };

  return (
    <>
      <Input
        placeholder="Please enter your guess"
        onChange={handlePhraseChange}
      />
      <Button onClick={() => onSubmit(phrase)}>Submit</Button>
    </>
  );
};
