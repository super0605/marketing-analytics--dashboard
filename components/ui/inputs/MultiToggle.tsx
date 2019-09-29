import * as React from 'react';
import styled from 'styled-components';
import { px, colors, WeekModeType, sizes } from "../../../constants/constants";
import { labelSmall } from "../../../constants/style-constants";

const MultiToggle = styled.div`
  width: 100%;
  height: ${px(sizes.compact)};
  display: flex;
  flex-direction: row;
  border-radius: ${px(sizes.compact / 2)};
  border: ${px(sizes.hair)} solid ${colors.primary};
  box-sizing: border-box;
  overflow: hidden;
  justify-content: space-evenly;
`;

interface ToggleItemProps {
  active: boolean;
}
const ToggleItem = styled.div`
  ${labelSmall};
  height: 100%;
  background-color: ${(props: ToggleItemProps) => props.active ? colors.primary : "white"};
  color: ${(props: ToggleItemProps) => props.active ? colors.white : colors.grayVeryDark};
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 ${px(sizes.junior)};
  cursor: ${(props: ToggleItemProps) => props.active ? "default" : "pointer"};
`;

interface MultiToggleCompProps {
  items: WeekModeType[];
  activeItem: WeekModeType;
}
interface MultiToggleCompState {
  activeItem: WeekModeType;
}
class MultiToggleComp extends React.Component<MultiToggleCompProps, MultiToggleCompState> {
  constructor(props: MultiToggleCompProps) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(item: WeekModeType) {
    this.setState({
      activeItem: item,
    });
  }

  render() {
    const { items } = this.props;
    const { activeItem } = this.state;

    const toggleItems = items.map((item, k) => (
      <ToggleItem
        key={k}
        active={item === activeItem}
        onClick={() => this.toggle(item)}
      >
      </ToggleItem>)
    );

    return (
      <MultiToggle>
        {toggleItems}
      </MultiToggle>
    );
  }
}

export default MultiToggleComp;
