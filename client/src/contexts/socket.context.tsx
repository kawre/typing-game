import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface Context {
  socket: Socket;
}

const SocketContext = createContext<Context>(null!);

const SocketsProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const socket = io("http://localhost:5000", {
    extraHeaders: { userId: user ? user.id : "" },
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
