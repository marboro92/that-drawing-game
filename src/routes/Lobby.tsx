import React, { useState, useEffect, useContext } from "react";
import { Text, Box, Input } from "@nulogy/components";
import { useParams, Link, withRouter } from "react-router-dom";
import { db } from "database";
import HostContext from "../HostContext";
import firebase from "firebase";
import { PhaseContainer } from '../components/PhaseContainer';
import { Button } from '../components/Button';

const Lobby = ({ history }: any) => {
  const { isHost } = useContext(HostContext);
  const { roomCode } = useParams();

  const [playerInput, setPlayerInput] = useState<String | null>();
  const [playerName, setPlayerName] = useState<String | null>();
  const [players, setPlayers] = useState<String[] | null>([]);
  const [roomId, setRoomId] = useState("");
  const [isGameOngoing, setIsGameOngoing] = useState(false);

  // Fetching players in lobby
  useEffect(() => {
    let unsubscibe: any = null;
    if (roomCode) {
      unsubscibe = db
        .collection("rooms")
        .where("room_id", "==", roomCode)
        .where("is_active", "==", true)
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setPlayers(doc.data().players);
            setRoomId(doc.id);
          });
        });
      return () => {
        unsubscibe();
      };
    }
  }, [roomCode]);

  //Add player to room
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

  // Listen for whether game has begun
  useEffect(() => {
    let unsubscribe: any = null;
    if (roomId) {
      unsubscribe = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(function (querySnapshot) {
          const responseData = querySnapshot.data();
          const isGameOngoingDb = responseData?.["is_game_ongoing"];
          setIsGameOngoing(isGameOngoingDb);
        });
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [history, isGameOngoing, roomCode, roomId]);

  // Redirect player to game is game has begun
  useEffect(() => {
    if (isGameOngoing) history.push(`/${roomCode}/game`);
    return () => { };
  }, [history, isGameOngoing, roomCode]);

  const playerNameHandler = (event: any) => {
    setPlayerInput(event.target.value);
  };

  const joinRoom = async () => {
    await setPlayerName(playerInput);
  };

  const initGame = async () => {
    await db.collection("rooms").doc(roomId).update({
      is_game_ongoing: true,
    });
  };

  return (
    <PhaseContainer>
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
      {isHost ? <Button as={Link} to={`/${roomCode}`} onClick={initGame}>
        Everyone's in, Start the Game
        </Button> : <Button onClick={joinRoom}>Submit</Button>}
    </PhaseContainer>
  );
};

export default withRouter(Lobby);

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
