import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Lobby = ({ children }: any) => {
  const { roomCode } = useParams();

  return <div> THIS IS LOBBY: {roomCode}</div>;
};
