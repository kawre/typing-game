import React, { useEffect } from "react";
import styled from "styled-components";
import { useTyping } from "../../../contexts/GameContext";
import Car from "../../../static/images/Car";
import Text from "../../../components/Text";
import { getUser } from "../../../api/users";
import { useState } from "react";
import { User } from "../../../types/auth.types";
import { UserHash } from "../TypingGame";
// Types -------------------------------------------------------------------------

interface Props {
  data: UserHash;
  userId: string;
  time: number;
  quote: string;
}

const fetchUser = async (id: string) => await getUser(id);

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = ({ userId, time, data: { progress, wpm } }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!userId) return;
    fetchUser(userId).then((res) => setUser(res));
  }, [userId]);

  if (!user) return null;
  return (
    <Wrapper>
      <Username>{user.username}</Username>
      <ProgressBar>
        <Car left={progress + "%"} />
      </ProgressBar>
      <Wpm>{wpm} wpm</Wpm>
    </Wrapper>
  );
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  border-bottom: 0.1875rem dashed ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: relative;

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

const Wpm = styled.p`
  text-align: left;
  flex-shrink: 0;
  margin-left: 12px;
  max-height: 60px;
  width: 80px;
`;

const Username = styled.p`
  text-align: right;
  overflow: hidden;
  overflow-wrap: break-word;
  flex-shrink: 0;
  margin-right: 12px;
  width: 80px;
  max-height: 60px;
`;
