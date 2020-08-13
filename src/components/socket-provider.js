import { createContext } from "preact";
import { Socket } from "phoenix";
import { useState, useEffect, useContext } from "preact/hooks";

const SocketContext = createContext(null);

const SocketProvider = ({ wsUrl, params, children }) => {
  const [socket] = useState(new Socket(wsUrl, { params }));

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket, params]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export { SocketProvider, useSocket };
