import React from "react";
import { Route, Switch } from "react-router-dom";
import FormWrapper from "./components/FormWrapper";
import Login from "./pages/Entry/Login";
import Register from "./pages/Entry/Register";
import Home from "./pages/Home/Home";
import TypingGame from "./pages/TypingGame/TypingGame";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const App: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/games/:id" component={TypingGame} />
      <FormWrapper>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </FormWrapper>
    </Switch>
  );
};

export default App;
