import React from "react";
import styled from "styled-components";
import Text from "../../../components/Text";
import { useTyping } from "../../../contexts/GameContext";
import { formatS } from "../../../utils/formatS";
import { HashTable } from "../TypingGame";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  data: HashTable;
  cntdwn: number;
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ data, cntdwn }) => {
  const { time, inGame } = useTyping();

  return (
    <Wrapper>
      <Stats>
        <Text>{formatS(inGame ? 300 - time : cntdwn)}</Text>
      </Stats>
      {Object.keys(data).map((id) => (
        <Track key={id} data={data[id]} userId={id} />
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
