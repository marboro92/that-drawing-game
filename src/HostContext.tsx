import React from "react";

const HostContext = React.createContext({
  isHost: false,
  playerName: "",
  roomId: "",

  //Functions
  setIsHost: (val: boolean) => {},
  setPlayerName: (val: string | null) => {},
  setRoomId: (val: string | null) => {},
});

export default HostContext;
