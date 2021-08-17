import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { io, Socket as ISocket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styled from "styled-components";
import Button from "../../components/Button";
// Types -------------------------------------------------------------------------

type Socket = ISocket<DefaultEventsMap, DefaultEventsMap>;

interface Props {}

// Component ---------------------------------------------------------------------
const EnterTypingGame: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState({} as Socket);
  const history = useHistory();

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          size="lg"
          isLoading={loading}
          variant="primary"
          onClick={async () => {
            setLoading(true);
            socket.emit("findRoom", async (id: any) => {
              if (!id) return setLoading(false);
              console.log(id);
              history.replace(`/game/${id}`);
            });
          }}
        >
          Enter a Typing Game
        </Button>
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
  background-color: ${({ theme }) => theme.colors.main30};
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;
