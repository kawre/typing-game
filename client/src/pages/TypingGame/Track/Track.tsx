import React, { useEffect } from "react";
import styled from "styled-components";
import { useTyping } from "../../../contexts/GameContext";
import Car from "../../../static/images/Car";
import Text from "../../../components/Text";
import { getUser } from "../../../api/users";
import { useState } from "react";
import { User } from "../../../types/auth.types";
// Types -------------------------------------------------------------------------

interface Props {
  progress: number;
  userId: string;
}

const fetchUser = async (id: string) => await getUser(id);

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = ({ progress, userId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!userId) return;
    fetchUser(userId).then((res) => setUser(res));
  }, [userId]);

  if (!user) return null;
  return (
    <Wrapper>
      <Text mr={4}>{user.username}</Text>
      <ProgressBar>
        <Car left={progress + "%"} />
      </ProgressBar>
      {/* <Text ml={4}>{Math.round(stats.wpm)} wpm</Text> */}
    </Wrapper>
  );
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 0.1875rem dashed ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    flex-grow: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.main};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  margin-right: 60px;
  top: 0;
  height: 30px;
  position: relative;
`;
