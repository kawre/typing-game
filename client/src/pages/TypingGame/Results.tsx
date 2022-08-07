import React from "react";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { useAuth } from "../../contexts/AuthContext";
import { useSockets } from "../../contexts/socket.context";
import { ordinalSuffix } from "../../utils/ordinalSuffix";
import { IResults } from "./TypingGame";
// Types -------------------------------------------------------------------------

interface Props {
  res: IResults;
}

// Component ---------------------------------------------------------------------
const Results: React.FC<Props> = ({ res }) => {
  const navigate = useNavigate();
  const { socket } = useSockets();
  const { user } = useAuth();

  return (
    <Wrapper>
      <Stats>
        <Block>
          {res.wpm}
          <p> wpm</p>
        </Block>
        <Block>
          {ordinalSuffix(res.place)}
          <p> place</p>
        </Block>
      </Stats>
      <Buttons>
        <Button
          size="lg"
          // isLoading={loading}
          variant="primary"
          onClick={async () => {
            // setLoading(true);
            socket.emit("room:find", user!.id);
            socket.on("room:found", (roomId) => {
              navigate(`/match/${roomId}`);
            });
          }}
        >
          <Icon as={TbRefresh} />
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default Results;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

const Stats = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
`;

const Block = styled.div`
  height: 12rem;
  width: 100%;
  font-size: 3rem;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.main}0d;
  border-radius: ${({ theme }) => theme.rounded.lg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: -0.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.colors.background};
  }
`;
