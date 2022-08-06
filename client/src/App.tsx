import React from "react";
import { Route, Switch } from "react-router-dom";
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
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/games/:id"
        component={() => (
          <GameProvider>
            <PrivateRoute>
              <TypingGame />
            </PrivateRoute>
          </GameProvider>
        )}
      />
      <Route exact path="/settings" component={Settings} />
      <Route
        exact
        path={["/login", "/register"]}
        component={() => (
          <FormWrapper>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </FormWrapper>
        )}
      />
      <Route component={() => <h1>porvalo</h1>} />
    </Switch>
  );
};

export default App;
