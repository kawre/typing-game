import React from "react";
import styled from "styled-components";
import ConfigSection from "./ConfigSection";
import ConfigSectionGroup from "./ConfigSectionGroup";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Settings: React.FC<Props> = () => {
  return (
    <Wrapper>
      <ConfigSectionGroup h="appearance">
        <ConfigSection btns={["off", "on"]}>
          <p>porvalo</p>
        </ConfigSection>
      </ConfigSectionGroup>
    </Wrapper>
  );
};

export default Settings;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

const Section = styled.div``;
