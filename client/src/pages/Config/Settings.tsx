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
        <ConfigSection
          name="font size"
          text="Change the font size of the test words."
          btns={["1", "1.25", "1.5", "2", "3", "4"]}
        />
        <ConfigSection btns={fontFamilies} name="font family" />
        <ConfigSection
          name="theme"
          text="Change the appearance of the site"
          btns={["light", "dark"]}
        />
      </ConfigSectionGroup>
    </Wrapper>
  );
};

export default Settings;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

const fontFamilies = [
  "Fira Code",
  "Source Code Pro",
  "Roboto Mono",
  "IBM Plex Sans",
];
