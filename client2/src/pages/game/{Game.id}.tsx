import { useParams } from "@reach/router";
import {} from "gatsby";
import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Game: React.FC<Props> = () => {
  const params = useParams();
  console.log(params);

  return <Wrapper></Wrapper>;
};

export default Game;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
