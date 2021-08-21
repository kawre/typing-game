import React from "react";
import styled from "styled-components";
import { HashTable } from "../TypingGame";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  data: HashTable;
  time: number;
  quote: string;
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ data, time, quote }) => {
  return (
    <Wrapper>
      {Object.keys(data).map((id) => (
        <Track key={id} time={time} data={data[id]} userId={id} quote={quote} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
`;
