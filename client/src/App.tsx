import React from "react";
import { Route, Routes } from "react-router-dom";
import FormWrapper from "./components/Form/FormWrapper";
import PrivateRoute from "./components/PrivateRoute";
import GameProvider from "./contexts/GameContext";
import Settings from "./pages/Config/Settings";
import Login from "./pages/Entry/Login";
import Register from "./pages/Entry/Register";
import Home from "./pages/Home/Home";
import TypingGame from "./pages/TypingGame/TypingGame";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const App: React.FC<Props> = () => {
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
