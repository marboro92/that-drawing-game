import React, { useState, useContext } from "react";
import { Input } from "@nulogy/components";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { db } from "database";
import styled from "styled-components";

import HostContext from "../HostContext";
import { PhaseContainer } from "../components/PhaseContainer";
import { Button } from "../components/Button";

const Title = styled.h1({
  color: "blue",
  fontWeight: "bold",
});

type Props = {
  history: History;
};

const Intro: React.FC<Props> = ({ history }) => {
  const { setIsHost, setPlayerName, setRoomId } = useContext(HostContext);
  const [hostName, setHostName] = useState<string>("");

  const initRoom = async () => {
    const roomCode = Math.random().toString(36).substring(7).toUpperCase();

    try {
      const savedRoom = await db.collection("rooms").add({
        room_id: roomCode,
        host_name: hostName,
        created_at: Date.now(),
        players: { [hostName]: [] },
        is_active: true,
        is_game_ongoing: false,
      });

      const roomId = savedRoom.id;

      setIsHost(true);
      setPlayerName(hostName); //Host is also a player
      setRoomId(roomId);

      // Send user to the lobby of the room code
      history.push(roomCode);
    } catch (err) {
      console.error(err);
    }
  };

  const hostNameHandler = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setHostName(target.value);
  };

  return (
    <PhaseContainer>
      <Title>That Drawing Game.</Title>
      <Input
        placeholder="You are the host! Enter your player name"
        onChange={hostNameHandler}
      />
      <Button onClick={initRoom}>Start a Room</Button>
    </PhaseContainer>
  );
};

export default withRouter(Intro);

// DO NOT DELETE
// HOW TO LISTEN TO REALTIME UPDATES ON A WHOLE COLLECTION
// db.collectionGroup("users").onSnapshot((snapshot) => {
//   snapshot.docChanges().forEach(function (change) {
//     if (change.type === "added") {
//       console.log("New: ", change.doc.data());
//     }
//     if (change.type === "modified") {
//       console.log("Modified: ", change.doc.data());
//     }
//     if (change.type === "removed") {
//       console.log("Removed: ", change.doc.data());
//     }
//   });
// });
