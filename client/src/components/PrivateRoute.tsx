import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/auth.types";
// Types -------------------------------------------------------------------------

// Component ---------------------------------------------------------------------
const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
