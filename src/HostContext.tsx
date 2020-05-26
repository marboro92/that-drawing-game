import React from "react";

const HostContext: any = React.createContext({
  isHost: false,
  playerName: "",
  roomId: "",
  room: {},

  //Functions
  setIsHost: (val: boolean) => {},
  setPlayerName: (val: string | null) => {},
  setRoomId: (val: string | null) => {},
  setRoom: (val: any) => {},
});

export default HostContext;
