import React, { useState, useContext } from "react";
import { Button, Input } from "@nulogy/components";
import { withRouter } from "react-router-dom";
import { db } from "database";
import HostContext from "../HostContext";

const Intro = ({ history }: any) => {
  const { setIsHost } = useContext(HostContext);
  const [hostName, setHostName] = useState<String | null>("");

  const initRoom = async () => {
    const roomCode = Math.random().toString(36).substring(7).toUpperCase();

    try {
      await db.collection("rooms").add({
        room_id: roomCode,
        host_name: hostName,
        created_at: Date.now(),
        players: [hostName],
        is_active: true,
        is_game_ongoing: false,
      });

      setIsHost(true);

      // Send user to the lobby of the room code
      history.push(roomCode);
    } catch (err) {
      console.error(err);
    }
  };

  const hostNameHandler = (e: any) => {
    setHostName(e.target.value);
  };

  return (
    <>
      <Input
        placeholder="You are the host! Enter your player name"
        onChange={hostNameHandler}
      />
      <Button onClick={initRoom}>Start a Room</Button>
    </>
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
