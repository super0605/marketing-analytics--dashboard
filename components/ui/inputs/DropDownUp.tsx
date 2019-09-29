import * as React from 'react';
import styled from 'styled-components';
import onClickOutside from "react-onclickoutside";
import { px, colors, sizes, DropDownType, elementSizes, elevation, zIndices, GlobalFiltersQueryType } from "../../../constants/constants";
import { labelBase, labelSmall } from "../../../constants/style-constants";

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: ${zIndices.zDropdown};
`;

const Choice = styled.div`
  ${labelBase};
  padding: ${px(sizes.micro)} ${px(sizes.compact)} ${px(sizes.micro)} ${px(sizes.fine)};
  background-color: ${colors.white};
  line-height: 1.25em;
  cursor: pointer;

`;
const ListChoice = styled(Choice)`
  border-bottom: ${px(sizes.hair)} solid ${colors.grayLight};

  :last-child {
    border-bottom: none;
  }
  ${labelSmall};
  :hover {
    background-color: #eee;
  }
`;

interface ChoicesListProps {
  isCollapsed: boolean;
}
const ChoicesList = styled.div`
  /* margin-top: ${px(sizes.micro)}; */
  position: absolute;
  top: ${px(elementSizes.inputHeight + 4)};
  left: 0;
  opacity: ${(props: ChoicesListProps) => props.isCollapsed ? 0 : 1};
  pointer-events: ${(props: ChoicesListProps) => props.isCollapsed ? "none" : "all"};
  box-shadow: ${elevation.dp4};
  max-height: 300px;
  overflow-y: auto;
`;

const SVG = styled.svg`
  position: absolute;
  top: ${px(sizes.little)};
  right: ${px(sizes.tiny)};
`;

const BottomLine = styled.div`
  height: ${px(sizes.hair)};
  width: 100%;
  position: absolute;
  left: 0;
  bottom: ${-px(sizes.hair)};
  background-color: ${colors.primary};
`;

interface DropdownCompProps<T> {
  choices: T[];
  selectedChoice: T;
  getLabel: (item: T) => string;
  direction?: DropDownType;
  handleSelect?: (selection: T, globalFiltersQuery?: GlobalFiltersQueryType) => void;
  globalFiltersQuery?: GlobalFiltersQueryType;
}
interface DropDownCompState {
  isCollapsed: boolean;
}
class DropdownComp<T> extends React.Component<DropdownCompProps<T>, DropDownCompState> {
  constructor(props: DropdownCompProps<T>) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    const { choices, getLabel, handleSelect, selectedChoice, globalFiltersQuery } = this.props;
    const { isCollapsed } = this.state;
    let items = null;
    if (choices !== undefined && choices !== null && choices.length > 0) {
      items = choices.map((choice, i) => {
        return (
          <ListChoice
            key={`choice-${i}`}
            onClick={() => {
              this.toggleCollapsed();
              handleSelect && handleSelect(choice, globalFiltersQuery);
            }}
          >
            {getLabel(choice)}
          </ListChoice>
        );
      });
    } else {
      items = <ListChoice>
                No data
              </ListChoice>
    }

    return (
      <DropdownWrapper>
        <Choice onClick={this.toggleCollapsed}>
          {getLabel(selectedChoice)}
        </Choice>
        <SVG width="10px" height="6px" viewBox="0 0 10 6">
          <polygon points="5 6 0 0 10 0" fill={colors.primary}></polygon>
        </SVG>
        <BottomLine />

        <ChoicesList isCollapsed={isCollapsed}>
          {items}
        </ChoicesList>
      </DropdownWrapper>
    );
  }

  handleClickOutside() {
    if (!this.state.isCollapsed) {
      this.setState({
        isCollapsed: true,
      });
    }
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }
}

export default onClickOutside(DropdownComp);
