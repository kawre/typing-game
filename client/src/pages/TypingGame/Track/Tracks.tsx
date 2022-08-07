import React from "react";
import styled from "styled-components";
import Text from "../../../components/Text";
import { useTyping } from "../../../contexts/GameContext";
import { formatS } from "../../../utils/formatS";
import { UserState } from "../TypingGame";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  data: UserState[];
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ data }) => {
  const isEmpty = Object.keys(data[0]).length === 0;
  if (isEmpty && data.length === 1) return null;
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
  padding: 1.5rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: flex-end;
`;
