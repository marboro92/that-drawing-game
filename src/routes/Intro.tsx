import React, { useState, useEffect } from "react";
import { Button, Text, Box, Input } from "@nulogy/components";
import { PhaseContainer } from "components/PhaseContainer";
import { Link } from "react-router-dom";
import { db } from "database";

type PlayerType = {
  name: String;
};

export const Intro = ({ children }: any) => {
  const [roomCode, setRoomCode] = useState<String | null>("");
  const [hostName, setHostName] = useState<String | null>("");
  const [players, setPlayers] = useState<String[] | null>([]);

  useEffect(() => {
    //Effect here
    if (roomCode) {
      db.collection("rooms")
        .where("room_id", "==", roomCode)
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setPlayers(doc.data().players);
          });
        });
      return () => {
        //Cleanup the subscription
      };
    }
  }, [roomCode]);

  const initRoom = async () => {
    // get a room code
    const randomCode = Math.random().toString(36).substring(7).toUpperCase();

    try {
      await db.collection("rooms").add({
        room_id: randomCode,
        host_name: hostName,
        created_at: Date.now(),
        players: [hostName],
      });
      setRoomCode(randomCode);
    } catch (err) {
      console.error(err);
    }
  };

  const hostNameHandler = (e: any) => {
    setHostName(e.target.value);
  };

  return (
    <>
      {!roomCode ? (
        <>
          <Input placeholder="You are the host! Enter your player name" onChange={hostNameHandler} />
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
            <ul>
              {players?.map((player) => (
                <li>{player}</li>
              ))}
            </ul>
            <Text>{hostName} (you)</Text>
          </Box>
          <Button as={Link} to={`/${roomCode}`}>
            Everyone's in, Start the Game
          </Button>
        </>
      )}
    </>
  );
};

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
