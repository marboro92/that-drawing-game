import React, { useState, useContext, useEffect } from "react";

import { db } from "database";
import { EnterPhrase } from "components/EnterPhrase";
import { EnterDrawing } from "components/EnterDrawing";
import { PhaseContainer } from "../components/PhaseContainer";
import { postContent } from "database/content";
import HostContext from "../HostContext";
import { CONTENT_TYPES } from "utilities/content-types";
import { WaitingScreen } from "components/WaitingScreen";

type Props = {
  children?: React.ReactNode;
};

type isRoundCompleteTypes = {
  players: any;
  roundNumber: number;
};

const checkRoundComplete = ({
  players = [],
  roundNumber,
}: isRoundCompleteTypes) => {
  const values = Object.values(players);
  const filteredValues = values.filter((value) => value.length === roundNumber);

  return filteredValues.length === values.length;
};

const Game: React.FC<Props> = ({ children }) => {
  const { playerName, roomId, setRoom, room } = useContext(HostContext);

  const [isDrawPhase, setIsDrawPhase] = useState(false);
  const [canProceedToNextRound, setCanProceedToNextRound] = useState(false);
  const [roundNumber, setRoundNumber] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleProceedToNextRound = () => {
    setIsPlaying(true);
    setRoundNumber((roundNumber) => roundNumber + 1);
  };

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

  // Checks if round is complete
  useEffect(() => {
    const players = room.players;
    const isRoundComplete: boolean = checkRoundComplete({
      players,
      roundNumber,
    });

    setCanProceedToNextRound(isRoundComplete);
  }, [room, roundNumber]);

  // Increment round number when users are able to proceed to next round
  useEffect(() => {
    canProceedToNextRound && handleProceedToNextRound();
  }, [canProceedToNextRound]);

  type ContentSubmitParams = {
    contentType: string;
    content: string;
  };

  const handleContentSubmit = async ({
    contentType,
    content,
  }: ContentSubmitParams) => {
    setIsPlaying(false);
    await postContent({
      roomId,
      content: content,
      playerName,
    });

    contentType === CONTENT_TYPES.drawing
      ? setIsDrawPhase(false)
      : setIsDrawPhase(true);
  };

  // Waiting rooms
  if (!isPlaying)
    return (
      <PhaseContainer>
        <WaitingScreen />
      </PhaseContainer>
    );

  // Player actions
  return (
    <PhaseContainer>
      {!isDrawPhase ? (
        <EnterPhrase
          onSubmit={(content: string) =>
            handleContentSubmit({ contentType: CONTENT_TYPES.phrase, content })
          }
        />
      ) : (
        <EnterDrawing
          onSubmit={(content: string) =>
            handleContentSubmit({ contentType: CONTENT_TYPES.drawing, content })
          }
        />
      )}
    </PhaseContainer>
  );
};

export default Game;
