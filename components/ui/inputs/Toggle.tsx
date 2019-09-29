import * as React from 'react';
import styled from 'styled-components';
import {px, sizes, colors, toggleStates, ToggleStateType} from "../../../constants/constants";
import {labelBase} from "../../../constants/style-constants";

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Toggle = styled.div`
  width: ${px(sizes.hefty)};
  height: ${px(sizes.petite)};
  background-color: ${colors.primary};
  border-radius: ${px(sizes.fine)};
  position: relative;
  cursor: pointer;
`;

interface TogglePillProps {
  position: ToggleStateType;
}
const TogglePill = styled.div`
  width: ${px(sizes.little)};
  height: ${px(sizes.little)};
  background-color: ${colors.white};
  margin: ${px(sizes.bristle)};
  border-radius: ${px(sizes.fine)};
  position: absolute;
  left: ${(props: TogglePillProps) => props.position === toggleStates.left ? 0 : "unset"};
  right: ${(props: TogglePillProps) => props.position === toggleStates.right ? 0 : "unset"};
`;

const Label = styled.div`
  ${labelBase};
  margin: 0 ${px(sizes.tiny)};
  white-space: nowrap;
`

interface ToggleCompProps<T> {
  items: [T, T];
  getLabel: (item: T) => string;
  activeItem: T;
  handleToggle: (selected: T) => void;
}

function ToggleComp<T>(props: ToggleCompProps<T>) {

  const { items, getLabel, activeItem, handleToggle } = props;
  return (
    <ToggleWrapper>
      <Label>{getLabel(items[0])}</Label>
      <Toggle
        onClick={() => {
          const newPosition = activeItem === items[0] ? items[1] : items[0]
          handleToggle(newPosition);
        }}
      >
        <TogglePill position={activeItem === items[0] ? toggleStates.left : toggleStates.right}/>
      </Toggle>
      <Label>{getLabel(items[1])}</Label>
    </ToggleWrapper>
  );
}

export default ToggleComp;
