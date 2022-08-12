import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GameProvider from "./contexts/GameContext";
import { useSockets } from "./contexts/socket.context";
import Settings from "./pages/Config/Settings";
import Login from "./pages/Entry/Login";
import Register from "./pages/Entry/Register";
import Home from "./pages/Home/Home";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const App: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { socket } = useSockets();

  useEffect(() => {
    socket.on("error", (err) => {
      if (err === "404" || err === "503") {
        toast.error("Match not found", {
          toastId: err,
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      }
    });
    return () => {
      socket.off("error");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match/:id" element={<GameProvider />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
