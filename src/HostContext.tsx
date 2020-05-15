import React from "react";

const HostContext = React.createContext({
  isHost: false,
  setIsHost: (val: boolean) => { }
});


export default HostContext

