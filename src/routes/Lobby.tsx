import React, { useState, useEffect, useContext } from "react";
import { Text, Box, Input } from "@nulogy/components";
import { useParams, Link, withRouter } from "react-router-dom";
import { db } from "database";
import { History } from "history";

import HostContext from "../HostContext";
import { PhaseContainer } from "../components/PhaseContainer";
import { Button } from "../components/Button";

type Props = {
  history: History;
};

const Lobby = ({ history }: Props) => {
  const { isHost, playerName, setPlayerName } = useContext(HostContext);
  const { roomCode } = useParams();

  const [playerInput, setPlayerInput] = useState<string | null>("");
  // const [playerName, setPlayerName] = useState<string | null>();
  const [players, setPlayers] = useState<string[] | null>([]);
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
            const playersObject = doc.data().players;
            setPlayers(Object.keys(playersObject));
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
        let playersFromDb = {};
        response.forEach(function (room) {
          roomId = room.id;
          const { players } = room.data();
          playersFromDb = players;
        });

        await db
          .collection("rooms")
          .doc(roomId)
          .update({
            players: {
              ...playersFromDb,
              [playerName]: [],
            },
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
    return () => {};
  }, [history, isGameOngoing, roomCode]);

  const playerNameHandler = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setPlayerInput(target.value);
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
      {isHost ? (
        <Button as={Link} to={`/${roomCode}`} onClick={initGame}>
          Everyone's in, Start the Game
        </Button>
      ) : (
        <Button onClick={joinRoom}>Submit</Button>
      )}
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
