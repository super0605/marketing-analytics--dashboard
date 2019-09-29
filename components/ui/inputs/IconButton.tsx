import * as React from 'react';
import styled from 'styled-components';
import {px, sizes, IconType} from "../../../constants/constants";
import {labelBase} from "../../../constants/style-constants";
import {iconUrls} from "../../../constants/valuesByType";


const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

interface IconButtonProps {
  size?: "small" | "medium";
}
const IconButton = styled.div`
  width: ${(props: IconButtonProps) => props.size === "small" ? px(sizes.petite) :  px(sizes.twice)};
  height: ${(props: IconButtonProps) => props.size === "small" ? px(sizes.petite) :  px(sizes.twice)};
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
`;

interface ButtonLabelProps {
  size?: "small" | "medium",
  alignment?: "left" | "right",
}
const ButtonLabel = styled.div`
  ${labelBase};
  text-align: right;
  margin: ${(props: ButtonLabelProps) =>
    props.size && props.size === "small" ? `0 ${px(sizes.tiny)}` : `0 ${px(sizes.fine)}`};
  order: ${(props: ButtonLabelProps) => props.alignment === "left" ? 0 : 1};
`;


interface IconButtonCompProps {
  type: IconType;
  label?: string;
  size?: "small" | "medium";
  alignment?: "left" | "right";
  handleClick?: () => void;
}
const IconButtonComp = (props: IconButtonCompProps) => {
  const { type, label, size, alignment, handleClick } = props;
  return (
    <IconButtonWrapper onClick={handleClick} >
      <ButtonLabel alignment={alignment} >{label}</ButtonLabel>
      <IconButton size={size} >
        <IconImage src={iconUrls.get(type)} />
      </IconButton>
    </IconButtonWrapper>
  );
}

export default IconButtonComp;
