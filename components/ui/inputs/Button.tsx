import React from "react";
import styled from "styled-components";
import { colors, ColorType } from "../../../constants/constants";
import {
  baseFontStyleProps,
  buttonSmall,
  buttonMedium,
  buttonBig
} from "../../../constants/style-constants";

interface ButtonProps {
  size?: "small" | "medium" | "big";
  color?: ColorType;
}
const Button = styled.button`
  ${baseFontStyleProps};
  ${(props: ButtonProps) =>
    props.size === "small"
      ? buttonSmall
      : props.size === "medium"
      ? buttonMedium
      : buttonBig};
  color: ${colors.white};
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  background-color: ${(props: ButtonProps) => props.color ? props.color : colors.primary};
  cursor: pointer;
`;

interface ButtonCompProps {
  label: string;
  color?: ColorType;
  size?: "small" | "medium" | "big";
  handleClick?: () => void;
}
const ButtonComp = (props: ButtonCompProps) => {
  const { label, size, color, handleClick } = props;
  return (
    <Button size={size} color={color} onClick={handleClick}>
      {label}
    </Button>
  );
};

export default ButtonComp;
