import React from "react";
import styled from "styled-components";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  users: number[];
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ users }) => {
  return (
    <Wrapper>
      {users.map((u, i) => (
        <Track key={u + i} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
`;
