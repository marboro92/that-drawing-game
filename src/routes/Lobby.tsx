import React, { useState, useEffect, useContext } from "react";
import { Button, Text, Box, Input } from "@nulogy/components";
import { useParams, Link } from "react-router-dom";
import { db } from "database";
import HostContext from "../HostContext";
import firebase from "firebase";

export const Lobby = ({ children }: any) => {
  const { isHost } = useContext(HostContext);
  const { roomCode } = useParams();
  console.log("roomCode", roomCode);

  const [playerInput, setPlayerInput] = useState<String | null>();
  const [playerName, setPlayerName] = useState<String | null>();
  const [players, setPlayers] = useState<String[] | null>([]);

  useEffect(() => {
    //Effect here
    if (roomCode) {
      db.collection("rooms")
        .where("room_id", "==", roomCode)
        .where("is_active", "==", true)
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setPlayers(doc.data().players);
          });
        });
      return () => {
        //Cleanup the subscription
        //Maybe set is_active_ to false in db?
      };
    }
  }, [roomCode]);

  useEffect(() => {
    const addPlayerToRoom = async () => {
      if (playerName) {
        const response = await db
          .collection("rooms")
          .where("room_id", "==", roomCode)
          .get();

        let roomId = "";
        response.forEach(function (room) {
          roomId = room.id;
        });

        await db
          .collection("rooms")
          .doc(roomId)
          .update({
            players: firebase.firestore.FieldValue.arrayUnion(playerName),
          });
      }
    };
    addPlayerToRoom();
  }, [playerName, roomCode]);

  const playerNameHandler = (event: any) => {
    setPlayerInput(event.target.value);
  };

  const joinRoom = async () => {
    await setPlayerName(playerInput);
  };

  const initGame = async () => {};

  return (
    <>
      <Text>
        Room Code: <b>{roomCode}</b>
      </Text>
      <Text>
        Send the link: <b>{window.location.href}</b>
      </Text>
      {!playerName && !isHost && (
        <>
          <Input
            placeholder="Enter your player name"
            onChange={playerNameHandler}
          />
          <Button onClick={joinRoom}>Submit</Button>
        </>
      )}
      <Box>
        <ul>
          {players?.map((player) => (
            <li key={String(player)}>
              {player}
              {playerName === player && "(you)"}
            </li>
          ))}
        </ul>
      </Box>
      {isHost && (
        <Button as={Link} to={`/${roomCode}`} onClick={initGame}>
          Everyone's in, Start the Game
        </Button>
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
