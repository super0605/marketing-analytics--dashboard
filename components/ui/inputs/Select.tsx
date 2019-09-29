import * as React from 'react';
import styled from 'styled-components';
import {colors, sizes, DropDownType, dropDownDirections, elementSizes, px, fonts} from "../../../constants/constants";
import {labelBase} from "../../../constants/style-constants";
import {SelectValue} from "../../../constants/interfaces";

interface DropdownWrapperProps {
  z: number;
}
const DropdownWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: ${px(elementSizes.inputHeight)};
  // width: ${px(sizes.extremehuge)};
  margin: 0 ${px(sizes.petite)} 0 ${px(sizes.petite)};
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
  font-weight: ${fonts.weightSemiBold};
  overflow: ${(props: DropdownListProps) => props.isCollapsed ? "hidden" : "visible"};
`;

interface DropdownChoiceProps {
  isCollapsed: boolean;
  dropdownAlign: string;
}
const DropdownChoice = styled.div`
  ${labelBase}
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: ${(props: DropdownChoiceProps) => props.dropdownAlign || 'left'};
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

interface SelectCompProps {
  choices: Array<SelectValue>;
  selectedChoice: String;
  direction?: DropDownType;
  z: number;
  dropdownAlign?: string;
}
interface SelectCompState {
  isCollapsed: boolean;
  selectedChoice: String;
}
class SelectComp extends React.Component<SelectCompProps, SelectCompState> {
  constructor(props: SelectCompProps) {
    super(props);
    this.state = {
      isCollapsed: true,
      selectedChoice: this.props.selectedChoice
    };    
  }

  render() {
    const { choices, direction, z, dropdownAlign  } = this.props;
    const { isCollapsed, selectedChoice } = this.state;
    const isDirectionUp = direction && direction === dropDownDirections.up;
    const isDirectionUpExpanded = isDirectionUp && !isCollapsed;

    const sortedChoices = choices.sort((choice: SelectValue) =>
      choice.name === selectedChoice ? 0 : 1
    );
    const sortedChoicesDirected = isDirectionUpExpanded
      ? sortedChoices.reverse()
      : sortedChoices;

      const items = sortedChoicesDirected.map((choice, i) => {
        return (
          <DropdownChoice
            key={`choice-${i}`}
            isCollapsed={isCollapsed}
            dropdownAlign={dropdownAlign}
            onClick={() => {
              if (!isCollapsed && choice.name !== selectedChoice) {
                this.setState({
                  selectedChoice: choice.name,
                  isCollapsed: true
                });
              }
            }}
          >
            {choice.name}
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

export default SelectComp;
