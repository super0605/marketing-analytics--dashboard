import React from "react";
import styled from "styled-components";
import AvatarLabel from "./AvatarLabel";
import { px, sizes } from "../../../../constants/constants"

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface AvatarImageWrapperProps {
  size?: "small" | "medium",
  alignment?: "left" | "right",
}
const AvatarImageWrapper = styled.div`
  width: ${(props: AvatarImageWrapperProps) => props.size === "small" ? px(sizes.junior) : px(sizes.hefty)};
  height: ${(props: AvatarImageWrapperProps) => props.size === "small" ? px(sizes.junior) : px(sizes.hefty)};
  border-radius: 50%;
  order: ${(props: AvatarImageWrapperProps) => props.alignment === "left" ? 1 : -1};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
`;


interface AvatarCompProps {
  avatar: string;
  name?: string;
  email?: string;
  size?: "small" | "medium";
  alignment?: "left" | "right";
}
const AvatarComp = (props: AvatarCompProps) => {
  const {avatar, name, email, size, alignment} = props;

  return (
    <AvatarContainer>
      <AvatarLabel label={name} sublabel={email} size={size} alignment={alignment} />
      <AvatarImageWrapper alignment={alignment} size={size}>
        <AvatarImage src={avatar} alt="user avatar image" />
      </AvatarImageWrapper>
    </AvatarContainer>
  );
};

export default AvatarComp;