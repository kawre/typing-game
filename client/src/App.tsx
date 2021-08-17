import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import TypingGame from "./pages/TypingGame/TypingGame";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const App: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/game/:id" component={TypingGame} />
    </Switch>
  );
};

export default App;
