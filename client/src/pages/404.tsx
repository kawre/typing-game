import React from "react";
import styled from "styled-components";
import Heading from "../components/Heading";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Page404: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Heading>You gay</Heading>
    </Wrapper>
  );
};

export default Page404;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
