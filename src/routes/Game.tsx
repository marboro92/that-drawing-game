import React, { useState, useContext, useEffect } from "react";

import { db } from "database";
import { EnterPhrase } from "components/EnterPhrase";
import { EnterDrawing } from "components/EnterDrawing";
import { PhaseContainer } from "../components/PhaseContainer";
import { postContent } from "database/content";
import HostContext from "../HostContext";
import { database } from "firebase";

type Props = {
  children?: React.ReactNode;
};

const Game: React.FC<Props> = ({ children }) => {
  const { playerName, roomId, setRoom } = useContext(HostContext);
  const [isDrawPhase, setIsDrawPhase] = useState(false);

  // Continually add room to context
  useEffect(() => {
    let unsubscibe: any = null;
    if (roomId) {
      unsubscibe = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(function (querySnapshot) {
          const room = querySnapshot.data();
          setRoom(room);
        });
      return () => {
        unsubscibe();
      };
    }
  }, [roomId, setRoom]);

  const handleGuessSubmit = async (phrase: string) => {
    await postContent({
      roomId,
      content: phrase,
      playerName,
    });
    setIsDrawPhase(true);
  };

  const handleDrawingSubmit = (drawing: string) => {
    postContent({
      roomId,
      content: drawing,
      playerName,
    });

    setIsDrawPhase(false);
  };

  return (
    <PhaseContainer>
      {!isDrawPhase ? (
        <EnterPhrase onSubmit={handleGuessSubmit} />
      ) : (
        <EnterDrawing onSubmit={handleDrawingSubmit} />
      )}
    </PhaseContainer>
  );
};

export default Game;
