import React from "react";

type Props = {};

const GameOver: React.FC<Props> = () => {
  return (
    <>
      <div>The game is over! Hope you had fun!</div>
      <div>
        Here we will show you all the things that were written and drawn in your
        particular round
      </div>
    </>
  );
};

export default GameOver;
