import React, { useState } from "react";
import { Button, Text, Box, Input } from "@nulogy/components";
import { PhaseContainer } from "components/PhaseContainer";
import { Link } from "react-router-dom";
import { db } from "database";

export const Intro = ({ children }: any) => {
  const [roomCode, setRoomCode] = useState<String | null>(null);
  const [screenName, setScreenName] = useState<String | null>(null);

  const initRoom = async () => {
    // get a room code
    const randomCode = Math.random().toString(36).substring(7).toUpperCase();

    try {
      await db.collection("rooms").add({
        room_id: randomCode,
        host_name: screenName,
        created_at: Date.now(),
        players: [screenName],
      });
      setRoomCode(randomCode);
    } catch (err) {
      console.error(err);
    }
  };

  const screenNameHandler = (e: any) => {
    setScreenName(e.target.value);
  };

  return (
    <PhaseContainer>
      {!roomCode ? (
        <>
          <Input placeholder="your screenname" onChange={screenNameHandler} />
          <Button onClick={initRoom}>Start a Room</Button>
        </>
      ) : (
        <>
          <Text>
            Room Code: <b>{roomCode}</b>
          </Text>
          <Text>
            Send the link:{" "}
            <b>
              {window.location.href}
              {roomCode}
            </b>
          </Text>
          <Box>
            <Text>--- Players will show up here ---</Text>
            <Text>{screenName} (you)</Text>
          </Box>
          <Button as={Link} to={`/${roomCode}`}>
            Everyone's in, Start the Game
          </Button>
        </>
      )}
    </PhaseContainer>
  );
};
