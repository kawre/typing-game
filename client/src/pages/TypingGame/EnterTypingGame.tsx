import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useSockets } from "../../contexts/socket.context";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const EnterTypingGame: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { socket } = useSockets();
  const { user } = useAuth();

  return (
    <Wrapper>
      <ButtonWrapper>
        {user ? (
          <Button
            size="lg"
            isLoading={loading}
            variant="primary"
            onClick={() => {
              setLoading(true);
              socket.emit("room:find", user.id);
              socket.on("room:found", (roomId) => {
                navigate(`/match/${roomId}`);
              });
            }}
          >
            Enter a Typing Game
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In to Play
          </Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default EnterTypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.main}1a;
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;
