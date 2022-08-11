import React from "react";
import styled from "styled-components";
import { GameState } from "../TypingGame";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  data: GameState;
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      {/* <Stats>
        <Text>{inGame ? formatS(306 - time) : 6 - time}</Text>
      </Stats> */}
      {data.map((u) => (
        <Track key={u.user.id} u={u} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 2rem 0;
`;

const Stats = styled.div`
  display: flex;
  justify-content: flex-end;
`;
