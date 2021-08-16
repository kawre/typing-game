import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const index: React.FC<Props> = () => {
  console.log("seima");
  return (
    <Wrapper>
      <h1>game</h1>
    </Wrapper>
  );
};

export default index;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
