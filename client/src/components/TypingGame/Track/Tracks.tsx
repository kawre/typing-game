import React from "react";
import styled from "styled-components";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = () => {
  const trackz = [1, 2];
  console.log("siema");

  return (
    <Wrapper>
      {trackz.map((t) => (
        <Track key={t} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 24px;
`;
