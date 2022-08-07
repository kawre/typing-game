import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/auth.types";
// Types -------------------------------------------------------------------------

interface Props extends React.PropsWithChildren {}

// Component ---------------------------------------------------------------------
const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
