import React, { useState, useContext, useEffect } from "react";
import { PhaseContainer } from "../components/PhaseContainer";
import HostContext from "../HostContext";

import { WaitingScreen } from "components/WaitingScreen";
import watchRoom from "../database/watchRoom";
import PlayingPhase from "components/PlayingPhase";

type Props = {
  children?: React.ReactNode;
};

type CheckAllPlayersCompletedRoundType = {
  players: any;
  roundNumber: number;
};

const checkAllPlayersCompletedRound = ({
  players = [],
  roundNumber,
}: CheckAllPlayersCompletedRoundType) => {
  const values = Object.values(players);
  const filteredValues = values.filter((value) => value.length === roundNumber);

  return filteredValues.length === values.length;
};

const Game: React.FC<Props> = ({ children }) => {
  const { roomId, setRoom, room, roundNumber, setRoundNumber } = useContext(HostContext);

  const [canProceedToNextRound, setCanProceedToNextRound] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Continually add room to context
  useEffect(() => {
    let unsubscibe: any = null;
    if (roomId) {
      unsubscibe = watchRoom(roomId, setRoom);
      return () => {
        unsubscibe();
      };
    }
  }, [roomId, setRoom]);

  // Checks if round is complete
  useEffect(() => {
    const players = room.players;
    const isRoundComplete: boolean = checkAllPlayersCompletedRound({
      players,
      roundNumber,
    });

    setCanProceedToNextRound(isRoundComplete);
  }, [room, roundNumber]);

  // Increment round number when users are able to proceed to next round
  useEffect(() => {
    if (canProceedToNextRound) {
      setIsPlaying(true);
      setRoundNumber((roundNumber: number) => roundNumber + 1);
    }
  }, [canProceedToNextRound, setRoundNumber]);

  const finishPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <PhaseContainer>
      {isPlaying ? (
        <PlayingPhase onSubmitContent={finishPlaying} />
      ) : (
        <WaitingScreen />
      )}
    </PhaseContainer>
  );
};

export default Game;
