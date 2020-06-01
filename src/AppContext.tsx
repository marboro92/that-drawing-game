import React from "react";
import { CONTENT_TYPES } from "utilities/content-types";

const AppContext: any = React.createContext({
  isHost: false,
  playerName: "",
  roomId: "",
  room: {},
  roundType: CONTENT_TYPES.phrase,
  roundNumber: 0,

  //Functions
  setIsHost: (val: boolean) => {},
  setPlayerName: (val: string | null) => {},
  setRoomId: (val: string | null) => {},
  setRoom: (val: any) => {},
  setRoundType: (val: string) => {},
  setRoundNumber: (val: number) => {},
});

export default AppContext;
