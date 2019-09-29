import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { px, elementSizes, sizes, colors } from "../../../constants/constants";
import {
  baseFontStyleProps,
  inputLogin,
  inputUnderlined
} from "../../../constants/style-constants";

interface InputFieldContainerProps {
  warnLevel?: "valid" | "warning" | "error";
}
const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${(props: InputFieldContainerProps) => {
    switch (props.warnLevel) {
      case "valid":
        return "inherit";
      case "warning":
        return colors.orangeTan;
      case "error":
        return colors.redBrick;
      default:
        return "inherit";
    }
  }};
`;

const Label = styled.label`
  ${baseFontStyleProps}
  margin-bottom: 6px;
`;

interface InputProps {
  theme: "login" | "underlined";
}
const InputField = styled.input`
  ${(props: InputProps) =>
    props.theme === "login" ? inputLogin : inputUnderlined};
  outline: none;
  padding: 0 ${px(sizes.fine)};
  box-sizing: border-box;
  height: ${px(elementSizes.inputHeight)};
  color: inherit;
`;

interface InputFieldCompProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  theme?: "login" | "underlined";
  handleInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  level?: "valid" | "warning" | "error";
}
const InputFieldComp = (props: InputFieldCompProps) => {
  const { label, placeholder, type, theme, handleInput, level } = props;
  return (
    <InputFieldContainer warnLevel={level}>
      {label && <Label>{label}</Label>}
      <InputField
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={handleInput}
        theme={theme}
      />
    </InputFieldContainer>
  );
};

export default InputFieldComp;
