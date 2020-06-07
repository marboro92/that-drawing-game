import React from "react";
import { CONTENT_TYPES } from "utilities/content-types";

//TODO: Fix the types of things in context
const AppContext = React.createContext<Partial<ContextProps>>({
  isHost: false,
  playerName: "",
  roomId: "",
  room: {},
  roundType: CONTENT_TYPES.phrase,
  roundNumber: 0,

  //Functions
  setIsHost: () => {},
  setPlayerName: () => {},
  setRoomId: () => {},
  setRoom: () => {},
  setRoundType: () => {},
  setRoundNumber: () => {},
});

type ContextProps = {
  isHost: boolean;
  playerName: string;
  roomId: string;
  room: RoomType;
  roundType: any; // Add round type here
  roundNumber: number;

  //Functions
  setIsHost: (val: boolean) => void;
  setPlayerName: (val: string | null) => void;
  setRoomId: (val: string | null) => void;
  setRoom: (val: any) => void;
  setRoundType: (val: string) => void;
  setRoundNumber: (val: number) => void;
};

type RoomType = any; // Add room type here

export default AppContext;
