import React from "react";
import styled from "styled-components";
import { Player } from "../TypingGame";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  data: Record<string, number>;
  time: number;
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ data, time }) => {
  return (
    <Wrapper>
      {Object.keys(data).map((id) => (
        <Track key={id} time={time} progress={data[id]} userId={id} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
`;
