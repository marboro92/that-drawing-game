import React, { useState } from "react";
import { Button, Text, Box, Input } from "@nulogy/components";
import { PhaseContainer } from "../components/PhaseContainer";
import { Link } from "react-router-dom";


export const Intro = ({ children }: any) => {
  const [roomCode, setRoomCode] = useState<String | null>(null);
  const [screenName, setScreenName] = useState<String | null>(null);
  const initRoom = async () => {
    // get a room code
    const roomCode = Math.random().toString(36).substring(7).toUpperCase();
    // submit screen name
    // await post room code to db
    // set roomCode in state
    setRoomCode(roomCode);
  }
  const screenNameHandler = (e: any) => {
    setScreenName(e.target.value)
  }

  return (
    <PhaseContainer>
      {!roomCode ?
        <>
          <Input placeholder="your screenname" onChange={screenNameHandler} />
          <Button onClick={initRoom}>Start a Room</Button>
        </> :
        <>
          <Text>
            Room Code: <b>{roomCode}</b>

          </Text>
          <Text>
            Send the link: <b>{window.location.href}{roomCode}</b>
          </Text>
          <Box>
            <Text>--- Players will show up here ---</Text>
            <Text>{screenName} (you)</Text>
          </Box>
          <Button as={Link} to={`/${roomCode}`}>Everyone's in, Start the Game</Button>
        </>}
    </PhaseContainer>
  )
};