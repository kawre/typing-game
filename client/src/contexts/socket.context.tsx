import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const SocketContext = createContext({ socket });

const SocketsProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
