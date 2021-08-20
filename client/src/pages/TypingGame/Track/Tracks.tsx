import React from "react";
import styled from "styled-components";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  data: Record<string, number>;
}

export interface IUser {
  progress: number;
  userId: string;
}

// Component ---------------------------------------------------------------------
const Tracks: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      {Object.keys(data).map((id) => {
        return <Track key={id} progress={data[id]} userId={id} />;
      })}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
`;
