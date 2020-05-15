import React, { useState } from "react";
import { Input, Button } from "@nulogy/components";

export const EnterPhrase = ({ children }: any) => {
  const [phrase, setPhrase] = useState<String>("");

  const handlePhraseChange = (e: any) => {
    setPhrase(e.target.value);
  };

  const handlePhraseSubmit = () => {
    console.log("User wants to submit phrase: ", phrase);
  };

  return (
    <>
      <Input
        placeholder="Please enter your guess"
        onChange={handlePhraseChange}
      />
      <Button onClick={handlePhraseSubmit}>Submit</Button>
    </>
  );
};
