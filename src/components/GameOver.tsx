import React, { useEffect, useContext } from "react";
import AppContext from "AppContext";
import { getGameContentForRound } from "utilities/functions";

type Props = {};

const GameOver: React.FC<Props> = () => {
  const { room, playerName } = useContext(AppContext);

  useEffect(() => {
    const playersInRoom = room?.players;

    const contentToDisplay = getGameContentForRound({
      playersInRoom,
      playerName,
    });

    //Use this index to render all the things of that index from every player's content
    return () => {};
  }, []);

  return (
    <>
      <div>The game is over! Hope you had fun!</div>
      <div>Playername: {playerName}</div>
      <div>room: {JSON.stringify(room)}</div>
    </>
  );
};

export default GameOver;
