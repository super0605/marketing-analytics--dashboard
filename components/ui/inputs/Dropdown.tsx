import * as React from 'react';
import styled from 'styled-components';
import { px, colors, sizes, DropDownType, dropDownDirections, UserRoleType, elementSizes } from "../../../constants/constants";
import { labelBase } from "../../../constants/style-constants";
import { getUserRoleLabel } from "../../../constants/valuesByType";

interface DropdownWrapperProps {
  z: number;
}
const DropdownWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: ${px(elementSizes.inputHeight)};
  width: ${px(sizes.extremehuge)};
  z-index: ${(props: DropdownWrapperProps) => props.z};
`

interface DropdownListProps {
  isCollapsed: boolean;
}
const DropdownList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  overflow: ${(props: DropdownListProps) => props.isCollapsed ? "hidden" : "visible"};
`;

interface DropdownChoiceProps {
  isCollapsed: boolean;
}
const DropdownChoice = styled.div`
  ${labelBase}
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: center;
  line-height: 2.2em;
  padding-right: ${px(sizes.junior)};
  background-color: white;

  :hover {
    cursor: pointer;
    background-color: #eee;
  }
  :first-child:hover {
    cursor: ${(props: DropdownChoiceProps) => props.isCollapsed ? "pointer" : "default"};
    background-color: white;
  }
`;

const SVG = styled.svg`
  position: absolute;
  top: ${px(sizes.fine)};
  right: ${px(sizes.tiny)};
`

const BottomLine = styled.div`
  height: ${px(sizes.dblhair)};
  width: 100%;
  position: absolute;
  left: 0;
  bottom: ${-px(sizes.dblhair)};
  background-color: ${colors.primary};
`

interface DropdownCompProps {
  choices: Array<UserRoleType>;
  selectedChoice: UserRoleType
  direction?: DropDownType;
  z: number;
}
interface DropDownCompState {
  isCollapsed: boolean;
  selectedChoice: UserRoleType;
}
class DropdownComp extends React.Component<DropdownCompProps, DropDownCompState> {
  constructor(props: DropdownCompProps) {
    super(props);
    this.state = {
      isCollapsed: true,
      selectedChoice: this.props.selectedChoice
    };
  }

  render() {
    const { choices, direction, z } = this.props;
    const { isCollapsed, selectedChoice } = this.state;
    const isDirectionUp = direction && direction === dropDownDirections.up;
    const isDirectionUpExpanded = isDirectionUp && !isCollapsed;

    const sortedChoices = choices.sort((choice: UserRoleType) =>
      choice === selectedChoice ? 0 : 1
    );
    const sortedChoicesDirected = isDirectionUpExpanded
      ? sortedChoices.reverse()
      : sortedChoices;

    const items = sortedChoicesDirected.map((choice, i) => {
      return (
        <DropdownChoice
          key={`choice-${i}`}
          isCollapsed={isCollapsed}
          onClick={() => {
            if (!isCollapsed && choice !== selectedChoice) {
              this.setState({
                selectedChoice: choice,
                isCollapsed: true
              });
            }
          }}
        >
          {getUserRoleLabel(choice)}
        </DropdownChoice>
      );
    });

    return (
      <DropdownWrapper z={z}>
        <DropdownList isCollapsed={isCollapsed}
          onClick={() => {
            this.setState({
              isCollapsed: !this.state.isCollapsed
            });
          }}
        >
          {items}
        </DropdownList>
        <SVG width="10px" height="6px" viewBox="0 0 10 6">
          <polygon id="Path-12" points="5 6 0 0 10 0" fill={colors.primary}></polygon>
        </SVG>
        <BottomLine />
      </DropdownWrapper>
    );
  }
}

export default DropdownComp;
