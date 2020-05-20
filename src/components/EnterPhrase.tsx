import React, { useState } from "react";
import { Input } from "@nulogy/components";
import { Button } from "./Button";
import { postContent } from "database/content";

type Props = {
  children?: React.ReactNode;
};

export const EnterPhrase: React.FC<Props> = ({ children }) => {
  const [phrase, setPhrase] = useState<string>("");

  const handlePhraseChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setPhrase(target.value);
  };

  const handlePhraseSubmit = (): void => {
    console.log("User wants to submit phrase: ", phrase);
    postContent({ roomId: "1234", content: phrase });

    //TODO: Post phrase to db under "rooms"
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
